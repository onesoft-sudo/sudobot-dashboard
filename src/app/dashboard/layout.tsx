"use client";

import useAuthWithCheck from "@/hooks/useAuthWithCheck";
import { usePathname } from "next/navigation";
import { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
    const pathname = usePathname();
    const isRecoveryPage =
        pathname === "/account/recovery" ||
        pathname === "/dashboard/account/recovery";
    const { user } = useAuthWithCheck(!isRecoveryPage);

    return <>{!isRecoveryPage && !user ? null : children}</>;
};

export default Layout;
