import { API } from "@/utils/api";
import axios, { AxiosResponse } from "axios";
import { SystemConfig } from "../../sudobot/src/types/SystemConfigSchema";

export function getStatus() {
    return axios.get(API.status()) as Promise<
        AxiosResponse<{
            status: SystemConfig["api"]["server_status"];
            description?: string;
            started: string;
        }>
    >;
}
