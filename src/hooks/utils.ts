import { useAppSelector } from "@/redux/hooks/AppStoreHooks";
import { useEffect, useRef } from "react";

export const useAppInitialized = () => {
    return useAppSelector((state) => state.initialization.initialized);
};

export const usePreviousValue = <T>(value: T): T | undefined => {
    const ref = useRef<T>();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
};
