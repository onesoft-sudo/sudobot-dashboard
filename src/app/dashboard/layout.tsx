"use client";

import useAuthWithCheck from "@/hooks/useAuthWithCheck";
import { FC, PropsWithChildren } from "react";
import { Metadata } from "next";

const metadata: Metadata = {
    robots: {
        follow: false,
        index: false,
    }
};

const Layout: FC<PropsWithChildren> = ({ children }) => {
    const { user } = useAuthWithCheck();

    return <>{user && children}</>;
};

export default Layout;
