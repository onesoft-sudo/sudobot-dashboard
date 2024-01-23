"use client";

import useMediaQuery from "./useMediaQuery";

export function useDeviceType() {
    return useMediaQuery("(min-width: 971px)") ? "desktop" : "mobile";
}

export function useIsDesktop() {
    return useDeviceType() === "desktop";
}

export function useIsMobile() {
    return useDeviceType() === "mobile";
}
