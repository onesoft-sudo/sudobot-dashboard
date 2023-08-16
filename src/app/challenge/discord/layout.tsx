import { Metadata } from "next";
import { FC, PropsWithChildren } from "react";

export const metadata: Metadata = {
    title: "Log in with Discord",
};

const DiscordLoginLayout: FC<PropsWithChildren> = ({ children }) => {
    return <>{children}</>;
};

export default DiscordLoginLayout;
