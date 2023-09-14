import { API } from "@/utils/api";
import axios from "axios";

export function login({
    username,
    password,
}: {
    username: string;
    password: string;
}) {
    return axios.post(
        API.login(),
        { username, password },
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
}

export function discordLogin({ code }: { code: string }) {
    return axios.post(
        API.discord(),
        {
            code,
        },
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
}
