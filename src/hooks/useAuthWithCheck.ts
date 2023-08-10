"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function useAuthWithCheck() {
    const { user, dispatch, currentGuild } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!user && user !== undefined) {
            router.push("/login");
        }
    }, [user]);

    return { user, dispatch, currentGuild };
}
