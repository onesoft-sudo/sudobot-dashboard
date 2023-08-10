"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { useRouterContext } from "@/contexts/RouterContext";
import { useContext, useEffect } from "react";

export default function useAuthWithCheck() {
    const { user, dispatch, currentGuild } = useContext(AuthContext);
    const router = useRouterContext();

    useEffect(() => {
        if (!user && user !== undefined) {
            router?.push("/login");
        }
    }, [user]);

    return { user, dispatch, currentGuild };
}
