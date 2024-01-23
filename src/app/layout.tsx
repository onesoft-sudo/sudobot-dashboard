import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PropsWithChildren } from "react";
import Navbar from "@/components/Navigation/Navbar";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "SudoBot",
    description: "The ultimate Discord Moderation Bot.",
};

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <header>
                        <Navbar />
                    </header>

                    {children}
                </Providers>
            </body>
        </html>
    );
}
