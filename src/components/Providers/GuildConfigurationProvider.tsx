"use client";

import { fetchConfig } from "@/api/config/config";
import { GuildConfigurationContext } from "@/contexts/GuildConfigurationContext";
import { useCurrentUserInfo } from "@/hooks/user";
import { logger } from "@/logging/logger";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { PropsWithChildren, useEffect } from "react";

export default function GuildConfigurationProvider({ children }: PropsWithChildren) {
    const { currentGuildId } = useCurrentUserInfo();

    const query = useQuery({
        queryKey: ["guildConfiguration", currentGuildId],
        queryFn: () => (currentGuildId ? fetchConfig(currentGuildId) : Promise.resolve(null)),
    });

    useEffect(() => {
        const handler = () => {
            logger.debug("GuildConfigurationProvider:useEffect:handler", "Refreshing guild configuration query");
            query.refetch();
        };

        window.addEventListener("sb:guild-config-save", handler);
        return () => window.removeEventListener("sb:guild-config-save", handler);
    }, [currentGuildId, query]);

    if (!currentGuildId) {
        return null;
    }

    if (query.isLoading || query.isPending) {
        return (
            <div className="flex items-center justify-center py-5">
                <CircularProgress />
            </div>
        );
    }

    if (query.isError) {
        return (
            <div className="py-3 text-red-500">
                <p>Failed to communicate with the server. Please refresh the page and try again.</p>
            </div>
        );
    }

    if (!query.data) {
        return (
            <div className="py-3 text-red-500">
                <p>The server returned an invalid response. Please refresh the page and try again.</p>
            </div>
        );
    }

    return (
        <GuildConfigurationContext.Provider value={{ configuration: query.data }}>
            {children}
        </GuildConfigurationContext.Provider>
    );
}
