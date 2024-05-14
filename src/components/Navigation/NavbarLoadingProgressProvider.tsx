"use client";

import { logger } from "@/logging/logger";
import { useAppDispatch } from "@/redux/hooks/AppStoreHooks";
import { setLoading } from "@/redux/slice/NavigationSlice";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

export default function NavbarLoadingProgressProvider({ children }: PropsWithChildren) {
    const dispatch = useAppDispatch();
    const pathname = usePathname();

    useEffect(() => {
        dispatch(setLoading(false));
        logger.debug("NavbarLoadingProgressProvider", "LOADED", pathname);
    }, [pathname]);

    useEffect(() => logger.debug("NavbarLoadingProgressProvider", "Rendering"));

    return children;
}
