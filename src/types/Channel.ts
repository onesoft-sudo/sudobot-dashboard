import { Guild } from "./Guild";

export type ChannelType = 'GUILD_TEXT' | 'GUILD_NEWS' | 'GUILD_CATEGORY';

export interface Channel {
    id: string;
    name: string;
    guild: Guild;
    type: ChannelType;
}