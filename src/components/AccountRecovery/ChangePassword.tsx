"use client";

import useAuthWithCheck from "@/hooks/useAuthWithCheck";
import { API } from "@/utils/api";
import { Alert, Button, LinearProgress, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { MdError } from "react-icons/md";
import FormLoading from "./FormLoading";

const ChangePassword: FC = () => {
    const {
        handleSubmit,
        formState: { errors },
        register,
        getValues,
        reset,
    } = useForm();
    const { user } = useAuthWithCheck();
    const mutation = useMutation({
        mutationFn: variables =>
            axios.patch(API.user(user?.id?.toString() ?? "0"), variables, {
                headers: {
                    Authorization: `Bearer ${encodeURIComponent(
                        user?.token ?? ""
                    )}`,
                },
            }),
    });
    const onValid = (data: any) => {
        mutation.mutateAsync(data).then(reset);
    };

    return (
        <form
            className="mx-2 my-3 rounded-lg w-[calc(100vw-20px)] sm:w-[auto] md:min-w-[20vw] md:relative"
            onSubmit={handleSubmit(onValid)}
            style={{
                background:
                    "linear-gradient(to right, rgba(45, 45, 45, 0.5), rgba(45, 45, 45, 0.6))",
                boxShadow: "0 0 2px 0 rgba(255, 255, 255, 0.6)",
            }}
        >
            <div
                className="absolute md:static top-0 left-0 w-[100%] h-[100%] md:h-[auto] md:rounded-t-[3px] overflow-hidden z-[1000]"
                style={{
                    display: mutation.isLoading ? "block" : "none",
                }}
            >
                <LinearProgress />
                <FormLoading isLoading={mutation.isLoading} />
            </div>

            <div className="pt-6 pb-3 px-4">
                {mutation.isSuccess && (
                    <>
                        <Alert severity="success">
                            Successfully updated your password.
                        </Alert>
                        <div className="pb-6"></div>
                    </>
                )}

                <TextField
                    label="New Password"
                    type="password"
                    fullWidth
                    {...register("password", {
                        required: "You must specify the new password to set!",
                    })}
                    color={errors.password?.message ? "error" : "primary"}
                />
                {errors.password?.message && (
                    <p className="text-xs text-red-500 pt-1 flex items-center gap-1">
                        <MdError size={"1.2em"} />{" "}
                        {errors.password?.message.toString()}
                    </p>
                )}

                <div className="pt-4"></div>

                <TextField
                    label="Confirm New Password"
                    type="password"
                    fullWidth
                    {...register("new_password_confirm", {
                        required: "You must confirm the new password!",
                        validate: value =>
                            getValues().password === value
                                ? undefined
                                : "Passwords do not match!",
                    })}
                    color={
                        errors.new_password_confirm?.message
                            ? "error"
                            : "primary"
                    }
                />
                {errors.new_password_confirm?.message && (
                    <p className="text-xs text-red-500 pt-1 flex items-center gap-1">
                        <MdError size={"1.2em"} />{" "}
                        {errors.new_password_confirm?.message.toString()}
                    </p>
                )}

                <div className="pt-3 flex justify-end">
                    <Button type="submit">Save</Button>
                </div>
            </div>
        </form>
    );
};

export default ChangePassword;
