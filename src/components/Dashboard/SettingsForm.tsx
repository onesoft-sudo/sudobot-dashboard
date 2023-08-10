"use client";

import { putConfig } from "@/api/config";
import { useAuthContext } from "@/contexts/AuthContext";
import { Alert, Snackbar } from "@mui/material";
import { Button } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { FC, ReactNode, useState } from "react";
import {
    FieldErrors,
    FieldValues,
    UseFormRegister,
    useForm,
} from "react-hook-form";
import { MdSave } from "react-icons/md";

interface SettingsFormProps {
    onSubmit?: (data: any) => any;
    children: (data: {
        register: UseFormRegister<FieldValues>;
        errors: FieldErrors<FieldValues>;
    }) => ReactNode;
}

const SettingsForm: FC<SettingsFormProps> = ({ onSubmit, children }) => {
    const {
        formState: { errors },
        register,
        handleSubmit,
    } = useForm();

    const { currentGuild, user } = useAuthContext();

    const mutation = useMutation({
        mutationKey: ["config", currentGuild?.id, user?.token],
        mutationFn: (data: any) =>
            putConfig(currentGuild?.id ?? "", user?.token ?? "", { data }),
    });

    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const innerOnSubmit = (data: any) => {
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
                <Button type="submit" startContent={<MdSave />} radius="sm">
                    Save Changes
                </Button>
            </div>

            {children({ errors, register })}
        </form>
    );
};

export default SettingsForm;
