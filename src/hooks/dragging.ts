import { useDragControls } from "framer-motion";
import { useEffect, useRef } from "react";

export const useDragControlsWithRef = <T extends HTMLElement>() => {
    const controls = useDragControls();
    const ref = useRef<T>(null);

    useEffect(() => {
        const touchHandler: (e: Event) => void = (e) => e.preventDefault();
        const element = ref.current;

        if (element) {
            element.addEventListener("touchstart", touchHandler, { passive: false });

            return () => {
                element.removeEventListener("touchstart", touchHandler, {
                    passive: false,
                } as EventListenerOptions);
            };
        }
    }, []);

    return { controls, ref };
};
