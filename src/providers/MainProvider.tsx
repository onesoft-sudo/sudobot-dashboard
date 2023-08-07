import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, PropsWithChildren, useState } from "react";

const MainProvider: FC<PropsWithChildren> = ({ children }) => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <NextUIProvider>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </NextUIProvider>
    );
};

export default MainProvider;
