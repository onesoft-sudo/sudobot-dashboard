"use client";

import PageLoadingProgress from "@/components/Common/PageLoadingProgress";
import MainProvider from "@/providers/MainProvider";
import { Inter } from "next/font/google";
import Navbar from "../components/Common/Navbar";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <head>
                <title>SudoBot</title>
            </head>
            <body className={inter.className}>
                <MainProvider>
                    <PageLoadingProgress />
                    <Navbar />
                    <div>{children}</div>
                </MainProvider>
            </body>
        </html>
    );
}
