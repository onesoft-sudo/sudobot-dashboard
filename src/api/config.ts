import { API } from "@/utils/api";
import axios from "axios";

export function putConfig(guildId: string, token: string, data: any) {
    return axios.put(API.config(guildId), data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
