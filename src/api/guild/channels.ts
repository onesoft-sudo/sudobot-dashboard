import { getAxiosClient } from "@/client/axios";
import { APIGuildChannel, ChannelType } from "discord-api-types/v10";

export const getChannels = (
    guildId: string,
): Promise<APIGuildChannel<ChannelType>[]> => {
    return getAxiosClient()
        .get(`/guilds/${encodeURIComponent(guildId)}/channels`)
        .then((res) => res.data);
};
