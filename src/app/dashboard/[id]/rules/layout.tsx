import { Metadata } from "next";
import { FC, PropsWithChildren } from "react";

export const metadata: Metadata = {
    title: "Message Rules - SudoBot Dashboard",
};

const MessageRulesPageLayout: FC<PropsWithChildren> = ({ children }) => {
    return <>{children}</>;
};

export default MessageRulesPageLayout;
