"use client";

import { useTheme } from "@/hooks/theme";
import { ThemeProvider, createTheme } from "@mui/material";
import { PropsWithChildren } from "react";

const lightTheme = createTheme();
const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

export default function MUIThemeProvider({ children }: PropsWithChildren) {
    const { mode } = useTheme();

    return <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>{children}</ThemeProvider>;
}
