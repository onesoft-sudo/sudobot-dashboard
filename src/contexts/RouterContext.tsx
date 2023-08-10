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

    useEffect(() => {
        console.log("Rerender!");
    });

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
