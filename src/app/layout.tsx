import AppStoreProvider from "@/providers/AppStoreProvider";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import DialogContainer from "@/components/Dialog/DialogContainer";
import AppBody from "@/components/Layout/AppBody";
import ClientSidePostHogProvider from "@/providers/ClientSidePosthogProvider";
import "@/styles/globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "SudoBot",
    description: "The ultimate Discord Bot for moderation purposes.",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: `https://${process.env.NEXT_PUBLIC_FRONTEND_DOMAIN}`,
        siteName: "SudoBot",
        title: "SudoBot",
        description: "The ultimate Discord Bot for moderation purposes.",
        images: [
            {
                url: `https://${process.env.NEXT_PUBLIC_FRONTEND_DOMAIN}/logo-full.png`,
                width: 1281,
                height: 641,
                alt: "SudoBot",
            },
        ],
        emails: ["support@sudobot.org"],
        determiner: "",
    },
    metadataBase: new URL((process.env.NEXT_PUBLIC_FRONTEND_DOMAIN?.startsWith("localhost") ? "http" : "https") + "://" + process.env.NEXT_PUBLIC_FRONTEND_DOMAIN!),
    alternates: {
        canonical: "./"
    },
};

export const viewport: Viewport = {
    colorScheme: 'dark light',
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 3,
    themeColor: '#005eff'
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
                        <DialogContainer />
                        <Providers>{children}</Providers>
                    </AppBody>
                </ClientSidePostHogProvider>
            </AppStoreProvider>
        </html>
    );
}
