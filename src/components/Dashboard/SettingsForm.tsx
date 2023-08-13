"use client";

import { getConfig, putConfig } from "@/api/config";
import { useAuthContext } from "@/contexts/AuthContext";
import { SettingCardProps } from "@/types/SetttingCardProps";
import { Alert, Snackbar } from "@mui/material";
import { Button } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FC, ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdSave } from "react-icons/md";

interface SettingsFormProps {
    onSubmit?: (data: any) => any;
    children: (data: SettingCardProps) => ReactNode;
}

const SettingsForm: FC<SettingsFormProps> = ({ onSubmit, children }) => {
    const {
        formState: { errors, touchedFields },
        register,
        handleSubmit,
        getFieldState,
        getValues,
    } = useForm();

    const { currentGuild, user } = useAuthContext();

    const query = useQuery({
        queryKey: ["config", currentGuild?.id, user?.token],
        queryFn: () =>
            getConfig(currentGuild?.id ?? "", user?.token ?? "", true),
        enabled: !!(currentGuild?.id && user?.token),
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
        <form onSubmit={handleSubmit(innerOnSubmit)}>
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

            <div className="justify-end flex px-5 pt-4 md:pt-[25px]">
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

            {query.data?.data &&
                children({
                    errors,
                    register,
                    getFieldState,
                    touchedFields,
                    getValues,
                    data: query.data?.data,
                })}
        </form>
    );
};

export default SettingsForm;
