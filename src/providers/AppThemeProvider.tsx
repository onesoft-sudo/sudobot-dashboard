"use client";

import { PropsWithChildren, useEffect, useState, type FC } from "react";

const AppThemeProvider: FC<PropsWithChildren> = ({ children }) => {
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

    return <div className={isDark ? "dark" : ""}>{children}</div>;
};

export default AppThemeProvider;
