"use client";

import { useTheme } from "@/hooks/theme";
import clsx from "clsx";
import { ComponentProps, PropsWithChildren, useEffect, type FC } from "react";

const AppBody: FC<PropsWithChildren<ComponentProps<"body">>> = ({ children, className, ...props }) => {
    const { mode, setMode } = useTheme();

    useEffect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        setMode(media.matches ? "dark" : "light");

        const onChange = () => {
            setMode(media.matches ? "dark" : "light");
        };

        media.addEventListener("change", onChange);
        return () => media.removeEventListener("change", onChange);
    }, [setMode]);

    return (
        <body
            className={clsx(className, {
                dark: mode === "dark",
            })}
            {...props}
        >
            {children}
        </body>
    );
};

export default AppBody;
