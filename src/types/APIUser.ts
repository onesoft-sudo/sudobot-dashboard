import { APIGuild } from "./APIGuild";

export interface APIUser {
    id: number;
    token: string;
    name?: string | null;
    username: string;
    guilds: APIGuild[];
    createdAt: Date;
}
