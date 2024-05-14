"use client";

import NavbarLoadingProgressProvider from "@/components/Navigation/NavbarLoadingProgressProvider";
import AppStoreInitializerProvider from "@/providers/AppStoreInitializationProvider";
import MUIThemeProvider from "@/providers/MUIThemeProvider";
import TanstackQueryProvider from "@/providers/TanstackQueryProvider";
import { NextUIProvider } from "@nextui-org/system";
import { PropsWithChildren } from "react";

export default function Providers({ children }: PropsWithChildren) {
    return (
        <TanstackQueryProvider>
            <NextUIProvider>
                <MUIThemeProvider>
                    <AppStoreInitializerProvider>
                        <NavbarLoadingProgressProvider>{children}</NavbarLoadingProgressProvider>
                    </AppStoreInitializerProvider>
                </MUIThemeProvider>
            </NextUIProvider>
        </TanstackQueryProvider>
    );
}
