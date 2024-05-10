"use client";

import clsx from "clsx";
import { ComponentProps, PropsWithChildren, useEffect, useState, type FC } from "react";

const AppBody: FC<PropsWithChildren<ComponentProps<"body">>> = ({ children, className, ...props }) => {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        setIsDark(media.matches);

        const onChange = () => {
            setIsDark(media.matches);
            console.log(isDark, media.matches);
        };

        media.addEventListener("change", onChange);
        return () => media.removeEventListener("change", onChange);
    }, []);

    return (
        <body
            className={clsx(className, {
                dark: isDark,
            })}
            {...props}
        >
            {children}
        </body>
    );
};

export default AppBody;
