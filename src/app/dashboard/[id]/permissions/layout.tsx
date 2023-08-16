import { Metadata } from "next";
import { FC, PropsWithChildren } from "react";

export const metadata: Metadata = {
    title: "Permissions - SudoBot Dashboard",
};

const PermissionPageLayout: FC<PropsWithChildren> = ({ children }) => {
    return <>{children}</>;
};

export default PermissionPageLayout;
