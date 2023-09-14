import { API } from "@/utils/api";
import axios from "axios";

export function updateUser({
    token,
    username,
    name,
    id,
    password,
}: {
    id: number | string;
    token: string;
    username?: string;
    name?: string | null;
    password?: string;
}) {
    return axios.patch(
        API.user(id.toString()),
        { username, name, password },
        {
            headers: {
                Authorization: `Bearer ${encodeURIComponent(token)}`,
            },
        }
    );
}
