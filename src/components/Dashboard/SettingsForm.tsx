/*
* This file is part of SudoBot Dashboard.
*
* Copyright (C) 2021-2023 OSN Developers.
*
* SudoBot Dashboard is free software; you can redistribute it and/or modify it
* under the terms of the GNU Affero General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* SudoBot Dashboard is distributed in the hope that it will be useful, but
* WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU Affero General Public License for more details.
*
* You should have received a copy of the GNU Affero General Public License
* along with SudoBot Dashboard. If not, see <https://www.gnu.org/licenses/>.
*/

"use client";

import { getConfig, putConfig } from "@/api/routes/config";
import { useAuthContext } from "@/contexts/AuthContext";
import useIsDesktop from "@/hooks/useIsDesktop";
import { SettingCardProps } from "@/types/SetttingCardProps";
import { Alert, Button as MUIButton, Snackbar } from "@mui/material";
import { Button } from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { MdRestore, MdSave, MdWarning } from "react-icons/md";

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
        formState: { errors, touchedFields, isDirty },
        register,
        handleSubmit,
        getFieldState,
        getValues,
        reset,
        setValue,
        setError,
        clearErrors,
    } = useForm();

    const { currentGuild, user } = useAuthContext();

    const query = useQuery({
        queryKey: ["config", currentGuild?.id, user?.token],
        queryFn: () =>
            getConfig(currentGuild?.id ?? "", user?.token ?? "", true),
        enabled: noInitialLoad && !!(currentGuild?.id && user?.token),
    });

    useEffect(() => console.log("Data updated", query.data), [query.status]);

    useEffect(() => {
        const callback = (e: Event) => {
            if (isDirty) {
                e.preventDefault();
                e.returnValue = "" as any;
            }
        };

        window.addEventListener("beforeunload", callback);

        return () => window.removeEventListener("beforeunload", callback);
    }, [isDirty]);

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationKey: ["config", currentGuild?.id, user?.token],
        mutationFn: (data: Record<string, any>) =>
            putConfig(currentGuild?.id ?? "", user?.token ?? "", {
                data,
            }),
        onSuccess() {
            reset({}, { keepValues: true });
            queryClient.invalidateQueries([
                "config",
                currentGuild?.id,
                user?.token,
            ]);
        },
    });

    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const innerOnSubmit = (data: Record<string, any>) => {
        setSnackBarOpen(true);
        onSubmit?.(data);
        mutation.mutate(data);
    };
    const isDesktop = useIsDesktop();

    const formReset = () => {
        console.log("Reset");

        formRef.current?.reset();
        reset();

        setState(s => ({ ...s, resetting: true }));

        setTimeout(() => {
            setState(s => ({
                ...s,
                resetting: false,
            }));
        }, 200);
    };

    return (
        <form
            noValidate
            onSubmit={handleSubmit(innerOnSubmit)}
            className={`px-3 md:px-0 md:mr-[10px] ${className}`}
            ref={formRef}
        >
            {buttons && (
                <>
                    <Snackbar
                        open={snackBarOpen}
                        autoHideDuration={4000}
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

                    <div className="justify-end md:flex pr-2 md:px-5 pt-4 md:pt-[25px] gap-3 items-center">
                        {isDirty &&
                            (isDesktop ? (
                                <div className="text-orange-500 flex items-center gap-2 pr-5">
                                    <MdWarning /> You have unsaved changes!
                                </div>
                            ) : (
                                <Snackbar open={isDirty}>
                                    <Alert
                                        style={{
                                            width: "100%",
                                            maxWidth: "100%",
                                            position: "relative",
                                        }}
                                        severity="warning"
                                        icon={false}
                                    >
                                        <div className="flex justify-between items-center w-[100%] max-w-[100%] min-w-[100%]">
                                            <div className="flex items-center gap-3">
                                                <MdWarning size={20} />

                                                <span>
                                                    You have unsaved changes!
                                                </span>
                                            </div>

                                            <div>
                                                <MUIButton
                                                    color="primary"
                                                    size="small"
                                                    onClick={() =>
                                                        formRef.current?.requestSubmit()
                                                    }
                                                    type="button"
                                                    className="absolute right-[10px] top-[50%] -translate-y-[50%]"
                                                >
                                                    SAVE
                                                </MUIButton>
                                            </div>
                                        </div>
                                    </Alert>
                                </Snackbar>
                            ))}

                        <div className="flex justify-end items-center">
                            <Button
                                type="button"
                                variant="flat"
                                color="danger"
                                startContent={<MdRestore />}
                                radius="sm"
                                onClick={formReset}
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
                    setError,
                    clearErrors,
                    reset,
                })}
        </form>
    );
};

export default SettingsForm;
