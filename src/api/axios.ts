import axios, { Axios, AxiosRequestConfig } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;
let axiosInstance: Axios | null = null;

export function createAxiosInstance(config?: AxiosRequestConfig) {
    return axios.create({
        baseURL: BASE_URL,
        ...config,
    });
}

export function createAxiosSingletonInstance(config?: AxiosRequestConfig) {
    return (axiosInstance = createAxiosInstance(config));
}

export function axiosSingletonInstance(config?: AxiosRequestConfig) {
    if (axiosInstance) {
        console.log("Retrieved singleton instance");
        return axiosInstance;
    }

    return createAxiosSingletonInstance(config);
}
