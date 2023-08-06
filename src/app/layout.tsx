"use client";

import MainProvider from "@/providers/MainProvider";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./Navbar";

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
                    <Navbar />
                    <div>{children}</div>
                </MainProvider>
            </body>
        </html>
    );
}
