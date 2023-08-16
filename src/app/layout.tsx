import PageLoadingProgress from "@/components/Common/PageLoadingProgress";
import MainProvider from "@/providers/MainProvider";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/Common/Navbar";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "SudoBot",
    description: "A perfect solution for Discord Server Moderation.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
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
