"use client";

import { logger } from "@/logging/logger";
import { ReactNode, useEffect, useRef, useState, type FC } from "react";

declare global {
    interface Window {
        onloadCallback?: () => void;
        grecaptcha: any;
    }
}

type ReCaptchaProps = {};

const ReCaptcha: FC<ReCaptchaProps> = ({}) => {
    const hasLoadedRef = useRef(false);
    const [scriptElement, setScriptElement] = useState<ReactNode>(null);

    useEffect(() => {
        setScriptElement(() => {
            return (
                <script
                    src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit"
                    async
                    defer
                ></script>
            );
        });

        if (!hasLoadedRef.current) {
            window.onloadCallback ??= () => {
                logger.debug(ReCaptcha.name, "ReCaptcha loaded");
                window.grecaptcha.render("recaptcha_container", {
                    sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
                    badge: "inline",
                    callback: (token: string) => {
                        logger.debug(ReCaptcha.name, "ReCaptcha token", token);
                    },
                    "expired-callback": () => {
                        logger.debug(ReCaptcha.name, "ReCaptcha expired");
                    },
                });
            };

            hasLoadedRef.current = true;
        }

        if (window.grecaptcha) {
            window.onloadCallback?.();
        }

        return () => {
            window.onloadCallback = undefined;

            try {
                window.grecaptcha.reset();
            } catch {}
        };
    }, []);

    return (
        <div>
            {scriptElement}
            <div id="recaptcha_container" className="dark:hue-rotate-180 dark:invert"></div>
        </div>
    );
};

export default ReCaptcha;
