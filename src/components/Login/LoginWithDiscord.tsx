"use client";

import { requestLoginWithDiscord, type LoginResponse } from "@/api/auth/login";
import { useIsLoggedIn } from "@/hooks/user";
import { useAppDispatch } from "@/redux/hooks/AppStoreHooks";
import { addGuilds } from "@/redux/slice/GuildCacheSlice";
import { login } from "@/redux/slice/UserSlice";
import { PostHogEvents } from "@/utils/analytics";
import { CircularProgress } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import posthog from "posthog-js";
import { useEffect, type FC } from "react";
import { MdCheck, MdError } from "react-icons/md";

type LoginWithDiscordProps = {
    code: string;
};

const LoginWithDiscord: FC<LoginWithDiscordProps> = ({ code }) => {
    const isLoggedIn = useIsLoggedIn();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const mutation = useMutation({
        mutationFn: ({ code }: { code: string }) => requestLoginWithDiscord(code),
        onSuccess(responseData: LoginResponse) {
            dispatch(
                login({
                    user: responseData.user,
                    token: responseData.token,
                    expires: responseData.expires,
                    storage: "local",
                    guildIds: responseData.guilds.map((guild) => guild.id),
                    currentGuildId: responseData.guilds[0]?.id,
                }),
            );

            dispatch(
                addGuilds({
                    guilds: responseData.guilds,
                    save: true,
                    storage: "local",
                }),
            );

            posthog.identify(responseData.user.id.toString(), {
                username: responseData.user.username,
                name: responseData.user.name,
                discordId: responseData.user.discordId,
                avatar: responseData.user.avatar,
            });

            posthog.capture(PostHogEvents.LoginSuccess, {
                type: "discord",
            });

            router.push("/dashboard");
        },
        onError(error) {
            posthog.capture(PostHogEvents.LoginFailed, {
                type: "discord",
                error,
            });
        },
    });

    useEffect(() => mutation.mutate({ code }), []); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (isLoggedIn) {
            router.push("/dashboard");
        }
    }, [isLoggedIn, router]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="flex flex-col items-center justify-center rounded-lg bg-white/70 p-3 shadow-[0_0_2px_0_rgba(0,0,0,0.2)] dark:shadow-[0_0_2px_0_rgba(255,255,255,0.6)] dark:[background:linear-gradient(to_right,rgba(45,45,45,0.5),rgba(45,45,45,0.6))] sm:w-80 md:w-96">
            {mutation.isPending && <CircularProgress />}
            {mutation.isSuccess && <MdCheck className="text-green-500" size="2.5rem" />}
            {mutation.isError && <MdError className="text-red-500" size="2.5rem" />}
            {mutation.isPending && <p className="mt-3">This may take a moment.</p>}

            {mutation.isSuccess && <p className="mt-3">You&rsquo;re logged in!</p>}
            {mutation.isError && (
                <p className="mt-3">
                    {mutation.error &&
                    mutation.error instanceof AxiosError &&
                    mutation.error.response?.status === 403 &&
                    mutation.error.response.data.error
                        ? mutation.error.response.data.error
                        : "We were unable to log you in."}
                </p>
            )}
        </div>
    );
};

export default LoginWithDiscord;
