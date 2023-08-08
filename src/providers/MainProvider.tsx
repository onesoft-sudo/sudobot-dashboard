import { AuthContextProvider } from "@/contexts/AuthContext";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, PropsWithChildren, useState } from "react";

const MainProvider: FC<PropsWithChildren> = ({ children }) => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <NextUIProvider>
            <AuthContextProvider>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </AuthContextProvider>
        </NextUIProvider>
    );
};

export default MainProvider;
