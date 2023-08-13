import { API } from "@/utils/api";
import axios from "axios";

export function getConfig(
    guildId: string,
    token: string,
    commands: boolean = false
) {
    return axios.get(
        `${API.config(guildId)}?commands=${encodeURIComponent(
            commands.toString()
        )}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
}

export function putConfig(guildId: string, token: string, data: any) {
    return axios.put(API.config(guildId), data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
