import { APIStatus } from "@/types/APIStatus";
import { API } from "@/utils/api";
import axios, { AxiosResponse } from "axios";

export function getStatus() {
    return axios.get(API.status()) as Promise<
        AxiosResponse<{
            status: APIStatus;
            description?: string;
            started: string;
        }>
    >;
}
