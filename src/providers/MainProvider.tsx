import { AuthContextProvider } from "@/contexts/AuthContext";
import { RouterContextProvider } from "@/contexts/RouterContext";
import { ThemeProvider, createTheme } from "@mui/material";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, PropsWithChildren, useState } from "react";

const theme = createTheme({
    palette: {
        mode: "dark",
    },
});

const MainProvider: FC<PropsWithChildren> = ({ children }) => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <ThemeProvider theme={theme}>
            <NextUIProvider>
                <AuthContextProvider>
                    <QueryClientProvider client={queryClient}>
                        <RouterContextProvider>
                            {children}
                        </RouterContextProvider>
                    </QueryClientProvider>
                </AuthContextProvider>
            </NextUIProvider>
        </ThemeProvider>
    );
};

export default MainProvider;
