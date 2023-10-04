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

"use client";

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
