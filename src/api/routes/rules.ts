import { API } from "@/utils/api";
import { axiosSingletonInstance } from "../axios";

const axios = axiosSingletonInstance();

export function createMessageRule(token: string, data: any) {
    return axios.post(
        API.rules(),
        {
            rule: data,
        },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${encodeURIComponent(token)}`,
            },
        }
    );
}
