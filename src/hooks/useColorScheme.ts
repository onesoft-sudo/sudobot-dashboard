"use client";

import useMediaQuery from "./useMediaQuery";

export function useColorScheme() {
    return useMediaQuery("(prefers-color-scheme: light)") ? "light" : "dark";
}

export function usePrefersLightMode() {
    return useColorScheme() === "light";
}

export function usePrefersDarkMode() {
    return useColorScheme() === "dark";
}
