import AppStoreProvider from "@/providers/AppStoreProvider";
import { NextUIProvider } from "@nextui-org/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import MainLayout from "@/layouts/MainLayout";
import AppStoreInitializerProvider from "@/providers/AppStoreInitializationProvider";
import AppThemeProvider from "@/providers/AppThemeProvider";
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
            <body className={inter.className}>
                <TanstackQueryProvider>
                    <AppThemeProvider>
                        <NextUIProvider>
                            <AppStoreProvider>
                                <AppStoreInitializerProvider>
                                    <MainLayout>{children}</MainLayout>
                                </AppStoreInitializerProvider>
                            </AppStoreProvider>
                        </NextUIProvider>
                    </AppThemeProvider>
                </TanstackQueryProvider>
            </body>
        </html>
    );
}
