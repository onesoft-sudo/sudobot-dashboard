"use client";

import { useEffect, useRef } from "react";

export default function usePreviousValue<T>(value: T) {
    const oldRef = useRef<T | undefined>(undefined);
    const nowRef = useRef<T | undefined>(undefined);

    useEffect(() => {
        oldRef.current = nowRef.current;
        nowRef.current = value;
    }, [value]);

    return oldRef.current;
}
