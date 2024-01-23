"use client";

import { useEffect, useState } from "react";

export default function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const result = window.matchMedia(query);
        setMatches(result.matches);

        const callback = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        result.addEventListener("change", callback);
        return () => result.removeEventListener("change", callback);
    }, [query]);

    return matches;
}
