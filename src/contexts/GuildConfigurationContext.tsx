import { GuildConfiguration } from "@/types/GuildConfiguration";
import { createContext, useContext } from "react";

type GuildConfigurationContextType = {
    configuration: GuildConfiguration;
};

export const GuildConfigurationContext = createContext<GuildConfigurationContextType | undefined>(undefined);

export function useGuildConfiguration() {
    const context = useContext(GuildConfigurationContext);

    if (!context) {
        throw new Error("useGuildConfiguration() must be used within a <GuildConfigurationProvider>");
    }

    return context.configuration;
}
