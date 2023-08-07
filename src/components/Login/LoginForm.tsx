"use client";

import { login } from "@/api/users";
import { Button, Checkbox, Input } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Link from "next/link";
import { FC } from "react";
import { useForm } from "react-hook-form";
import Alert from "../Common/Alert";

interface LoginFormData {
    username: string;
    password: string;
}

const LoginForm: FC = () => {
    const {
        formState: { errors },
        register,
        handleSubmit,
    } = useForm<LoginFormData>();

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: login,
        mutationKey: ["login"],
        onError(error: AxiosError<{ error?: string }>) {
            console.log("Login failed", error);
        },
        onSuccess(data) {
            console.log("Login successful", data);
        },
    });

    const onValid = (data: LoginFormData) => {
        console.log(data);
        mutation.mutate(data);
    };

    return (
        <form
            className="mx-3 md:mx-auto my-3 p-4 rounded-lg md:w-[20vw]"
            onSubmit={handleSubmit(onValid)}
            style={{
                background:
                    "linear-gradient(to right, rgba(45, 45, 45, 0.5), rgba(45, 45, 45, 0.6))",
                boxShadow: "0 0 2px 0 rgba(255, 255, 255, 0.6)",
            }}
        >
            {mutation.error?.response?.data?.error && (
                <Alert type="error">
                    {mutation.error?.response?.data?.error ??
                        "An error has occurred"}
                    .
                </Alert>
            )}

            {mutation.data?.data?.id && (
                <Alert type="success">Login successful.</Alert>
            )}

            <Input
                type="text"
                label="Username"
                labelPlacement="inside"
                color="primary"
                variant="bordered"
                {...register("username", {
                    required: true,
                    value: "",
                })}
                description={
                    <p className="text-red-500">
                        {errors?.username?.type === "required"
                            ? "Please specify a username to log in!"
                            : ""}
                    </p>
                }
            />

            <br />

            <Input
                type="password"
                label="Password"
                labelPlacement="inside"
                color="primary"
                variant="bordered"
                {...register("password", {
                    required: true,
                    value: "",
                })}
                description={
                    <p className="text-red-500">
                        {errors?.password?.type === "required"
                            ? "Please provide your password to log in!"
                            : ""}
                    </p>
                }
            />
            <div className="flex items-center justify-between mt-2">
                <Checkbox>
                    <p style={{ fontSize: 14 }}>Remember me</p>
                </Checkbox>
                <Link
                    href="/login"
                    className="link ml-3"
                    style={{ fontSize: 14 }}
                >
                    Forgot password?
                </Link>
            </div>

            <br />

            <Button
                type="submit"
                fullWidth
                color="primary"
                variant="flat"
                isLoading={mutation.isLoading}
            >
                Login
            </Button>
        </form>
    );
};

export default LoginForm;
