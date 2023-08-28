"use client";

import Loading from "@/components/Loading/Loading";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouterContext } from "@/contexts/RouterContext";
import { useEffect } from "react";

export default function DefaultDashboard() {
    const router = useRouterContext();
    const { currentGuild } = useAuthContext();

    useEffect(() => {
        if (currentGuild) {
            router?.push(`/dashboard/${encodeURIComponent(currentGuild.id)}`);
        }
    }, [currentGuild]);

    return (
        <main className="my-4">
            <Loading />
        </main>
    );
}
