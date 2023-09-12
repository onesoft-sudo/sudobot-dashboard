import { SetStateAction, useRef, useState } from "react";

export default function useDebouncedState<T>(
    delay = 350,
    defaultValue?: T | (() => T)
) {
    const [state, setState] = useState(defaultValue);
    const ref = useRef<any>(null);

    const debouncedSetState = (value: SetStateAction<T | undefined>) => {
        if (ref.current) {
            clearTimeout(ref.current);
        }

        ref.current = setTimeout(() => {
            console.log("Debounced state update");
            setState(value);
            ref.current = null;
        }, delay);
    };

    return [state, debouncedSetState, setState] as const;
}
