import { getAxiosClient } from "@/client/axios"
import {APIGuildChannel, ChannelType} from 'discord-api-types/v10'

export const getChannels = (guildId: string): Promise<APIGuildChannel<ChannelType>[]> => {
    // return getAxiosClient().get(`/guilds/${encodeURIComponent(guildId)}/channels`).then(res => res.data);

    return Promise.resolve([
        {
            id: '1',
            type: ChannelType.GuildText,
            guild_id: guildId,
            position: 0,
            name: 'general',
        },
        {
            id: '2',
            type: ChannelType.GuildText,
            guild_id: guildId,
            position: 1,
            name: 'random',
        },
        {
            id: '3',
            type: ChannelType.GuildVoice,
            guild_id: guildId,
            position: 2,
            name: 'voice',
        }
    ])
}