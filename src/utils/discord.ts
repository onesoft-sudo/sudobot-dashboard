import { Guild } from "@/types/Guild";

export const getGuildIconURL = (guild: Guild, size?: number) => {
    if (!guild.icon) {
        return undefined;
    }

    return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp` + (size ? `?size=${size}` : "");
};
