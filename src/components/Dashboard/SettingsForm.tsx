"use client";

import { getConfig, putConfig } from "@/api/config";
import { useAuthContext } from "@/contexts/AuthContext";
import { SettingCardProps } from "@/types/SetttingCardProps";
import { Alert, Snackbar } from "@mui/material";
import { Button } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { MdRestore, MdSave } from "react-icons/md";

interface SettingsFormProps {
    onSubmit?: (data: any) => any;
    children: (data: SettingCardProps) => ReactNode;
    noInitialLoad?: boolean;
    className?: string;
    buttons?: boolean;
}

const SettingsForm: FC<SettingsFormProps> = ({
    onSubmit,
    children,
    noInitialLoad = true,
    className = "",
    buttons = true,
}) => {
    const [state, setState] = useState({ resetting: false });
    const formRef = useRef<HTMLFormElement>(null);
    const {
        formState: { errors, touchedFields },
        register,
        handleSubmit,
        getFieldState,
        getValues,
        reset,
        setValue,
    } = useForm();

    const { currentGuild, user } = useAuthContext();

    const query = useQuery({
        queryKey: ["config", currentGuild?.id, user?.token],
        queryFn: () =>
            getConfig(currentGuild?.id ?? "", user?.token ?? "", true),
        enabled: noInitialLoad && !!(currentGuild?.id && user?.token),
    });

    useEffect(() => console.log("Data updated", query.data), [query.status]);

    const mutation = useMutation({
        mutationKey: ["config", currentGuild?.id, user?.token],
        mutationFn: (data: Record<string, any>) =>
            putConfig(currentGuild?.id ?? "", user?.token ?? "", {
                data,
            }),
    });

    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const innerOnSubmit = (data: Record<string, any>) => {
        setSnackBarOpen(true);
        onSubmit?.(data);
        mutation.mutate(data);
    };

    return (
        <form
            noValidate
            onSubmit={handleSubmit(innerOnSubmit)}
            className={`px-3 md:px-0 ${className}`}
            ref={formRef}
        >
            {buttons && (
                <>
                    <Snackbar
                        open={snackBarOpen}
                        autoHideDuration={6000}
                        onClose={() => setSnackBarOpen(false)}
                    >
                        <Alert
                            onClose={() => setSnackBarOpen(false)}
                            severity="info"
                            icon={false}
                            style={{
                                backgroundColor: "#222",
                                padding: "8px 20px",
                            }}
                            className="min-w-[100%] lg:min-w-[20vw]"
                        >
                            The changes have been saved.
                        </Alert>
                    </Snackbar>

                    <div className="justify-end flex pr-2 md:px-5 pt-4 md:pt-[25px] gap-3">
                        <Button
                            type="button"
                            variant="flat"
                            color="danger"
                            startContent={<MdRestore />}
                            radius="sm"
                            onClick={() => {
                                console.log("Reset");

                                formRef.current?.reset();
                                reset();

                                setState(s => ({ ...s, resetting: true }));

                                setTimeout(() => {
                                    setState(s => ({ ...s, resetting: false }));
                                }, 200);
                            }}
                        >
                            Reset
                        </Button>

                        <Button
                            type="submit"
                            variant="flat"
                            color="primary"
                            startContent={<MdSave />}
                            radius="sm"
                        >
                            Save Changes
                        </Button>
                    </div>
                </>
            )}

            {!state.resetting &&
                query.data?.data &&
                children({
                    errors,
                    register,
                    getFieldState,
                    touchedFields,
                    getValues,
                    data: query.data?.data,
                    setValue,
                })}
        </form>
    );
};

export default SettingsForm;
