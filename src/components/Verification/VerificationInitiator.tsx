"use client";

import { Route } from "@/api/Routes";
import { getAxiosClient } from "@/client/axios";
import { Alert, Button, CircularProgress } from "@mui/material";
import { Spacer } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { type FC } from "react";
import ReCaptcha from "../Utils/Recaptcha";

type VerificationInitiatorProps = {
    guildId: string;
    token: string;
};

const VerificationInitiator: FC<VerificationInitiatorProps> = ({ token, guildId }) => {
    const router = useRouter();
    const mutation = useMutation({
        mutationFn: async (response: string) => {
            return getAxiosClient().put(Route.VERIFY_CAPTCHA, {
                token,
                recaptchaResponse: response,
            });
        },
        onSuccess() {
            router.push(
                `/guilds/${encodeURIComponent(guildId)}/verify/next?token=${encodeURIComponent(token)}&method=captcha&utm_source=sudobot&utm_medium=web&utm_campaign=verification`,
            );
        },
    });

    return (
        <div className="relative flex flex-col items-center justify-center rounded-lg bg-white/70 p-3 shadow-[0_0_2px_0_rgba(0,0,0,0.2)] dark:shadow-[0_0_2px_0_rgba(255,255,255,0.6)] dark:[background:linear-gradient(to_right,rgba(45,45,45,0.5),rgba(45,45,45,0.6))] sm:w-80 md:w-96">
            <p className="text-sm text-default-500">
                To continue, we will request some basic information about you in the next page. The availability of
                verification methods may differ from server to server.
            </p>

            <Spacer y={4} />

            <form
                action={(data) => {
                    mutation.mutate(data.get("g-recaptcha-response")?.toString() ?? "");
                }}
                className="w-full"
            >
                {mutation.isError && (
                    <Alert severity="error" className="mb-4">
                        An error occurred. Please try again.
                    </Alert>
                )}

                <div className="flex items-center justify-center">
                    <ReCaptcha />
                </div>

                <div className="flex items-center justify-end pt-3">
                    <Button
                        fullWidth
                        type="submit"
                        disabled={mutation.isPending || mutation.isSuccess}
                        className="flex items-center justify-center gap-2"
                    >
                        {mutation.isPending ||
                            (mutation.isSuccess && (
                                <CircularProgress size={20} className="text-gray-400 dark:text-gray-600" />
                            ))}
                        Continue
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default VerificationInitiator;
