"use client";

import Loading from "@/components/Loading/Loading";
import { useRouterContext } from "@/contexts/RouterContext";
import useAuthWithCheck from "@/hooks/useAuthWithCheck";
import { useEffect } from "react";

export default function DefaultDashboard() {
    const router = useRouterContext();
    const { currentGuild } = useAuthWithCheck();

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
