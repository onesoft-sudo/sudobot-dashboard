import AppStoreProvider from "@/providers/AppStoreProvider";
import { NextUIProvider } from "@nextui-org/system";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import MainLayout from "@/layouts/MainLayout";
import "@/styles/globals.css";

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
            <body className={inter.className}>
                <NextUIProvider>
                    <AppStoreProvider>
                        <MainLayout>{children}</MainLayout>
                    </AppStoreProvider>
                </NextUIProvider>
            </body>
        </html>
    );
}
