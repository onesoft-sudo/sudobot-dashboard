"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { useRouterContext } from "@/contexts/RouterContext";
import { useContext, useEffect } from "react";

export default function useAuthWithCheck(condition: boolean = true) {
    const { user, dispatch, currentGuild } = useContext(AuthContext);
    const router = useRouterContext();

    useEffect(() => {
        if (!user && user !== undefined && condition) {
            router?.push("/login");
        }
    }, [user]);

    return { user, dispatch, currentGuild };
}
