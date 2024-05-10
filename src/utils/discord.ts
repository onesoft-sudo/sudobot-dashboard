import { Guild } from "@/types/Guild";

export const getGuildIconURL = (guild: Guild, size?: number) => {
    return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp` + (size ? `?size=${size}` : "");
};
