"use client";

import { ThemeProvider, createTheme } from "@mui/material";
import { PropsWithChildren } from "react";

export const theme = createTheme({
    palette: {
        mode: "dark",
    },
});

export function MUIProvider({ children }: PropsWithChildren) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
