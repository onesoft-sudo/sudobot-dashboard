"use client";

import { login } from "@/api/auth";
import { AuthContextAction, useAuthContext } from "@/contexts/AuthContext";
import { useRouterContext } from "@/contexts/RouterContext";
import {
    Button,
    Checkbox,
    CircularProgress,
    Divider,
    Input,
} from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import Alert from "../Common/Alert";
import Link from "../Router/Link";
import DiscordLogin from "./DiscordLogin";

interface LoginFormData {
    username: string;
    password: string;
    remember: boolean;
}

const LoginForm: FC = () => {
    const {
        formState: { errors },
        register,
        handleSubmit,
    } = useForm<LoginFormData>();
    const router = useRouterContext();

    const { user, dispatch } = useAuthContext();

    const mutation = useMutation<any, any, LoginFormData>({
        mutationFn: login,
        mutationKey: ["login"],
        onError(error: AxiosError<{ error?: string }>) {
            console.log("Login failed", error);
        },
        onSuccess(data, { remember }) {
            console.log("Login successful");

            try {
                (remember ? localStorage : sessionStorage).setItem(
                    "user",
                    JSON.stringify(data.data.user)
                );
            } catch (e) {}

            dispatch?.({
                type: AuthContextAction.Login,
                payload: {
                    user: data.data.user,
                },
            });

            router?.push("/dashboard");
        },
    });

    useEffect(() => {
        if (user?.token) {
            router?.push("/dashboard");
        }
    }, [user]);

    const onValid = (data: LoginFormData) => {
        mutation.mutate(data);
    };

    return (
        <form
            className="mx-2 my-3 p-4 rounded-lg w-[calc(100vw-20px)] sm:w-[auto] md:min-w-[20vw]"
            onSubmit={handleSubmit(onValid)}
            style={{
                background:
                    "linear-gradient(to right, rgba(45, 45, 45, 0.5), rgba(45, 45, 45, 0.6))",
                boxShadow: "0 0 2px 0 rgba(255, 255, 255, 0.6)",
            }}
        >
            {user === undefined && (
                <>
                    <CircularProgress isIndeterminate className="mx-auto" />
                </>
            )}

            {user !== undefined && (
                <>
                    {mutation.error?.response?.data?.error && (
                        <Alert type="error">
                            {mutation.error?.response?.data?.error ??
                                "An error has occurred"}
                            .
                        </Alert>
                    )}

                    {mutation.data?.data?.user && (
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
                        <Checkbox defaultChecked {...register("remember")}>
                            <p className="text-xs md:text-md">Remember me</p>
                        </Checkbox>
                        <Link
                            href="/login"
                            className="link ml-3 text-xs md:text-md"
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

                    <Divider className="my-5" />

                    <DiscordLogin isDisabled={mutation.isLoading} />
                </>
            )}
        </form>
    );
};

export default LoginForm;
