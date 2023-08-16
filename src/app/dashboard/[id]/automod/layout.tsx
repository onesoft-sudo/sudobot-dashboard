import { Metadata } from "next";
import { FC, PropsWithChildren } from "react";

export const metadata: Metadata = {
    title: "Auto Moderation - SudoBot Dashboard",
};

const AutoModPageLayout: FC<PropsWithChildren> = ({ children }) => {
    return <>{children}</>;
};

export default AutoModPageLayout;
