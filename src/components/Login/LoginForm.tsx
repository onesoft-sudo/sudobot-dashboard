"use client";

import { LoginResponse, requestLogin } from "@/api/auth/login";
import { useRouter } from "@/hooks/router";
import { useIsLoggedIn } from "@/hooks/user";
import { logger } from "@/logging/logger";
import { useAppDispatch } from "@/redux/hooks/AppStoreHooks";
import { addGuilds } from "@/redux/slice/GuildCacheSlice";
import { login } from "@/redux/slice/UserSlice";
import { PostHogEvents } from "@/utils/analytics";
import { Alert } from "@mui/material";
import { Button, Checkbox, Divider, Input } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { useEffect, useMemo, type FC } from "react";
import { useForm } from "react-hook-form";
import { FaDiscord } from "react-icons/fa6";
import { MdCheck, MdError } from "react-icons/md";
import NextUITextFieldStyleReset from "../Utils/NextUITextFieldStyleReset";

type LoginFormFields = {
    username: string;
    password: string;
    remember: boolean;
};

const LoginForm: FC = () => {
    const {
        formState: { errors },
        register,
        handleSubmit,
    } = useForm<LoginFormFields>({
        defaultValues: {
            remember: true,
        },
    });
    const isLoggedIn = useIsLoggedIn();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const loginMutation = useMutation({
        mutationFn: requestLogin,
    });
    const searchParams = useSearchParams();
    const continueTo = useMemo(() => {
        let value = searchParams.get("ct");

        if (!value?.startsWith("/") || value.startsWith("http")) {
            value = null;
        }

        return value;
    }, [searchParams]);

    useEffect(() => {
        if (isLoggedIn) {
            router.push(continueTo ?? "/dashboard");
        }
    }, [isLoggedIn, router]); // eslint-disable-line react-hooks/exhaustive-deps

    const onSubmit = (data: LoginFormFields) => {
        logger.debug("LoginForm", data);

        loginMutation.mutate(data, {
            onSuccess(responseData: LoginResponse) {
                dispatch(
                    login({
                        user: responseData.user,
                        token: responseData.token,
                        expires: responseData.expires,
                        storage: data.remember ? "local" : "session",
                        guildIds: responseData.guilds.map((guild) => guild.id),
                        currentGuildId: responseData.guilds[0]?.id,
                    }),
                );

                dispatch(
                    addGuilds({
                        guilds: responseData.guilds,
                        save: true,
                        storage: data.remember ? "local" : "session",
                    }),
                );

                posthog.identify(responseData.user.id.toString(), {
                    username: responseData.user.username,
                    name: responseData.user.name,
                    discordId: responseData.user.discordId,
                    avatar: responseData.user.avatar,
                });

                posthog.capture(PostHogEvents.LoginSuccess, {
                    type: "credentials",
                });

                router.push("/dashboard");
            },
            onError(error) {
                posthog.capture(PostHogEvents.LoginFailed, {
                    type: "credentials",
                    error,
                });
            },
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <NextUITextFieldStyleReset />

            {loginMutation.isError && (
                <Alert severity="error" className="mb-4">
                    Incorrect username or password. Please try again.
                </Alert>
            )}

            <div className="pb-5">
                <Input
                    type="text"
                    label="Username"
                    labelPlacement="inside"
                    variant="bordered"
                    color="primary"
                    description={
                        errors.username && (
                            <p className="mt-0.5 text-xs text-red-500">
                                <MdError className="inline-block" /> {errors.username.message}
                            </p>
                        )
                    }
                    {...register("username", {
                        required: "You must specify a username to log in.",
                    })}
                />
            </div>

            <div className="pb-3">
                <Input
                    type="password"
                    label="Password"
                    labelPlacement="inside"
                    color="primary"
                    variant="bordered"
                    autoComplete="current-password"
                    description={
                        errors.password && (
                            <p className="mt-0.5 text-xs text-red-500">
                                <MdError className="inline-block" /> {errors.password.message}
                            </p>
                        )
                    }
                    {...register("password", {
                        required: "Please enter your password to log in.",
                    })}
                />
            </div>

            <div className="flex items-center justify-between pb-5">
                <Checkbox defaultSelected {...register("remember")}>
                    <p className="text-xs">Remember me</p>
                </Checkbox>
                <Link href="/account/recovery" className="link text-xs">
                    Forgot password?
                </Link>
            </div>

            <Button
                type="submit"
                startContent={loginMutation.isSuccess ? <MdCheck size="1.2rem" /> : undefined}
                isLoading={loginMutation.isPending}
                isDisabled={loginMutation.isSuccess}
                color="primary"
                variant="flat"
                fullWidth
            >
                Login
            </Button>

            <Divider className="my-5" />

            <Button
                startContent={<FaDiscord size="1.2rem" />}
                type="button"
                isDisabled={loginMutation.isPending || loginMutation.isSuccess}
                as={Link}
                href="/login/discord"
                color="primary"
                variant="flat"
                fullWidth
            >
                Login With Discord
            </Button>
        </form>
    );
};

export default LoginForm;
