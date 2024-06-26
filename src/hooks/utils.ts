import { useAppSelector } from "@/redux/hooks/AppStoreHooks";
import { useEffect, useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

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

export const useTimedState = <T>(value: T, timeout: number): [T, (value: T) => void] => {
    const [state, setState] = useState(value);
    const timeoutRunning = useRef(false);
    const update = (value: T | (() => T)) => {
        if (timeoutRunning.current) {
            return;
        }

        timeoutRunning.current = true;
        setState(value);
        const previous = state;

        setState(value);
        setTimeout(() => {
            setState(previous);
            timeoutRunning.current = false;
        }, timeout);
    };

    return [state, update];
};

export const useRandomUUID = () => {
    return useMemo(() => uuidv4(), []);
};
