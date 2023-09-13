"use client";

import useAuthWithCheck from "@/hooks/useAuthWithCheck";
import { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
    const { user } = useAuthWithCheck();

    return <>{user && children}</>;
};

export default Layout;
