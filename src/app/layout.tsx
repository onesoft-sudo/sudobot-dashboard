import AppStoreProvider from "@/providers/AppStoreProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import AppBody from "@/components/Layout/AppBody";
import ClientSidePostHogProvider from "@/providers/ClientSidePosthogProvider";
import "@/styles/globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "SudoBot",
    description: "The ultimate Discord Bot for moderation purposes.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <AppStoreProvider>
                <ClientSidePostHogProvider>
                    <AppBody className={inter.className}>
                        <Providers>{children}</Providers>
                    </AppBody>
                </ClientSidePostHogProvider>
            </AppStoreProvider>
        </html>
    );
}
