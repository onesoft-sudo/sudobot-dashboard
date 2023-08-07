"use client";

import MainProvider from "@/providers/MainProvider";
import { Inter } from "next/font/google";
import Footer from "../components/Common/Footer";
import Navbar from "../components/Common/Navbar";
import "./globals.css";

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
                    <Footer />
                </MainProvider>
            </body>
        </html>
    );
}
