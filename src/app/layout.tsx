import AppStoreProvider from "@/providers/AppStoreProvider";
import { NextUIProvider } from "@nextui-org/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import AppBody from "@/components/Layout/AppBody";
import AppStoreInitializerProvider from "@/providers/AppStoreInitializationProvider";
import MUIThemeProvider from "@/providers/MUIThemeProvider";
import TanstackQueryProvider from "@/providers/TanstackQueryProvider";
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
            <AppStoreProvider>
                <AppBody className={inter.className}>
                    <TanstackQueryProvider>
                        <NextUIProvider>
                            <MUIThemeProvider>
                                <AppStoreInitializerProvider>{children}</AppStoreInitializerProvider>
                            </MUIThemeProvider>
                        </NextUIProvider>
                    </TanstackQueryProvider>
                </AppBody>
            </AppStoreProvider>
        </html>
    );
}
