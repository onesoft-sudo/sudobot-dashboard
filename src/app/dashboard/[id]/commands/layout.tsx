import { Metadata } from "next";
import { FC, PropsWithChildren } from "react";

export const metadata: Metadata = {
    title: "Commands - SudoBot Dashboard",
};

const CommandsPageLayout: FC<PropsWithChildren> = ({ children }) => {
    return <>{children}</>;
};

export default CommandsPageLayout;
