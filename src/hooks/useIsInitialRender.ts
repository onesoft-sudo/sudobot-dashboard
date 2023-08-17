import { useEffect, useRef } from "react";

export default function useIsInitialRender() {
    const ref = useRef(true);

    useEffect(() => {
        if (ref.current) {
            ref.current = false;
        }
    });

    return ref.current;
}
