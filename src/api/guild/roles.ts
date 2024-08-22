import { getAxiosClient } from "@/client/axios";
import { APIRole } from "discord-api-types/v10";

export const getRoles = (guildId: string): Promise<APIRole[]> => {
    return getAxiosClient()
        .get(`/guilds/${encodeURIComponent(guildId)}/roles`)
        .then((res) => res.data);
};
