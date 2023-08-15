"use client";

import { useEffect, useState } from "react";

export default function useSessionStorage(
    key: string,
    value?: string | (() => string)
): [
    string | null | undefined,
    (newValue: string) => void,
    (stateUpdate?: boolean) => void
] {
    const [state, setState] = useState<string | null | undefined>(undefined);

    useEffect(() => {
        try {
            setState(
                typeof value === "undefined"
                    ? sessionStorage.getItem(key)
                    : value instanceof Function && typeof value === "function"
                    ? value()
                    : value
            );
        } catch (e) {
            console.log(e);
            setState(null);
        }
    }, []);

    const updateStateAndSession = (newValue: string) => {
        try {
            sessionStorage.setItem(key, newValue);
            setState(newValue);
        } catch (e) {
            console.log(e);
        }
    };

    const removeStateAndSession = (stateUpdate?: boolean) => {
        try {
            sessionStorage.removeItem(key);

            if (stateUpdate) {
                setState(null);
            }
        } catch (e) {
            console.log(e);
        }
    };

    return [state, updateStateAndSession, removeStateAndSession];
}
