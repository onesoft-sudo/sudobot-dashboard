import { API } from "@/utils/api";
import axios from "axios";

export async function login({
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
