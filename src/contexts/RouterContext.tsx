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

import { usePathname, useRouter } from "next/navigation";
import {
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

interface RouterContextData {
    loading: boolean;
    on(event: "loadStart" | "loadEnd", handler: () => any): void;
    off(event: "loadStart" | "loadEnd"): void;
    emit(event: "loadStart" | "loadEnd"): void;
    push(path: string): void;
}

export const RouterContext = createContext<RouterContextData | undefined>(
    undefined
);

export function RouterContextProvider({ children }: PropsWithChildren) {
    const pathname = usePathname();
    const router = useRouter();
    const [state, setState] = useState<{
        onLoadStart: (() => any) | null;
        onLoadEnd: (() => any) | null;
        loading: boolean;
    }>({
        loading: false,
        onLoadStart: null,
        onLoadEnd: null,
    });

    useEffect(() => {
        setState(state => ({ ...state, loading: false }));
    }, [pathname]);

    return (
        <RouterContext.Provider
            value={{
                loading: state.loading,
                on(event, handler) {
                    setState(state => ({
                        ...state,
                        [event]: handler,
                    }));
                },
                off(event) {
                    setState(state => ({
                        ...state,
                        [event]: null,
                    }));
                },
                emit(event) {
                    if (event === "loadStart") {
                        setState(state => ({ ...state, loading: true }));
                    } else {
                        setState(state => ({ ...state, loading: false }));
                    }

                    return (
                        state[
                            (event === "loadEnd"
                                ? "onLoadEnd"
                                : "onLoadStart") as keyof typeof state
                        ] as Function
                    )?.();
                },
                push(path) {
                    this.emit("loadStart");
                    router.push(path);
                },
            }}
        >
            {children}
        </RouterContext.Provider>
    );
}

export function useRouterContext() {
    return useContext(RouterContext);
}
