/*
 * This file is part of SudoBot Dashboard.
 *
 * Copyright (C) 2021-2023 OSN Developers.
 *
 * SudoBot Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * SudoBot Dashboard is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with SudoBot Dashboard. If not, see <https://www.gnu.org/licenses/>.
 */

import PageLoadingProgress from "@/components/Common/PageLoadingProgress";
import MainProvider from "@/providers/MainProvider";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
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
                <Script src="https://www.googletagmanager.com/gtag/js?id=G-379PDRZ5H0" />
                <Script id="google-analytics">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        
                        gtag('config', 'G-379PDRZ5H0');
                    `}
                </Script>
                <Script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7605999007195732" async crossOrigin="anonymous" />

                <MainProvider>
                    <PageLoadingProgress />
                    <Navbar />
                    <div>{children}</div>
                </MainProvider>
            </body>
        </html>
    );
}
