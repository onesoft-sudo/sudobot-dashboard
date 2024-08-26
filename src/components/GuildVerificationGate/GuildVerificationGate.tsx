"use client";

import { verifyMember } from "@/api/verification/verification";
import { logger } from "@/logging/logger";
import { Guild } from "@/types/Guild";
import { Spacer } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { FC, ReactNode, useEffect, useRef, useState } from "react";

type GuildVerificationGateProps = {
    guild: Guild;
    userId: string;
    requestToken: string;
};

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

declare var window: Window & {
    turnstile: {
        ready: (callback: () => void) => void;
        render: (selector: string, options: any) => void;
        remove: (selector: string) => void;
        reset: (selector?: string) => void;
    };
    turnstileOnLoad?: () => void;
};

const GuildVerificationGate: FC<GuildVerificationGateProps> = ({
    guild,
    userId,
    requestToken,
}) => {
    const [turnstileScript, setTurnstileScript] = useState<ReactNode>(null);
    const hasLoadedRef = useRef(false);
    const { mutate, error, isPending, isSuccess, isError } = useMutation({
        mutationFn: verifyMember,
    });

    useEffect(() => {
        setTurnstileScript(() => {
            return (
                <script
                    src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=turnstileOnLoad&render=explicit"
                    async
                    defer
                ></script>
            );
        });

        if (!hasLoadedRef.current) {
            window.turnstileOnLoad ??= () => {
                logger.debug(GuildVerificationGate.name, "Turnstile Ready");

                window.turnstile.render("#turnstile-container", {
                    sitekey: SITE_KEY,
                    callback: (token: string) => {
                        mutate({
                            guildId: guild.id,
                            userId,
                            captchaToken: token,
                            token: requestToken,
                        });
                    },
                });
            };

            hasLoadedRef.current = true;
        }

        if (window.turnstile) {
            window.turnstileOnLoad?.();
        }

        return () => {
            window.turnstileOnLoad = undefined;

            try {
                window.turnstile.reset("#turnstile-container");
            } catch {}
        };
    }, []);

    return (
        <div>
            {turnstileScript}
            <h1 className="mb-3 text-center text-3xl lg:text-4xl">Verify</h1>
            <h3 className="text-center text-[#999]">
                to continue to{" "}
                <strong className="text-black dark:text-white">
                    {guild.name}
                </strong>
            </h3>
            <Spacer y={3} />
            <div className="flex w-[20.5rem] flex-col items-center gap-3 rounded-lg bg-neutral-100 px-4 pb-2 pt-3 shadow dark:bg-neutral-900 dark:shadow-neutral-600/60 max-lg:w-full">
                <p className="pb-5 text-sm text-neutral-700 dark:text-neutral-400">
                    This server is requires verification for new members. To
                    verify yourself, complete the challenge below.
                </p>
                <div id="turnstile-container"></div>
                <noscript>
                    <p className="font-semibold">
                        Enable JavaScript to continue!
                    </p>
                </noscript>
            </div>
        </div>
    );
};

export default GuildVerificationGate;
