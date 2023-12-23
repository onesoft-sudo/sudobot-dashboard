import axios, { Axios, AxiosHeaders, AxiosRequestConfig } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;
let axiosInstance: Axios | null = null;

export function createAxiosInstance(config?: AxiosRequestConfig) {
    return axios.create({
        baseURL: BASE_URL,
        ...config,
    });
}

export function createAxiosSingletonInstance(config?: AxiosRequestConfig) {
    axiosInstance = createAxiosInstance(config);
    let token: string | undefined;

    try {
        token = JSON.parse(localStorage.getItem("user")!)?.token;
    } catch (error) {}

    axiosInstance.interceptors.request.use(request => ({
        ...request,
        headers: new AxiosHeaders({
            ...(token
                ? {
                      Authorization:
                          request.headers.Authorization ?? `Bearer ${token}`,
                  }
                : {}),
            ...request.headers,
        }),
    }));
    return axiosInstance;
}

export function axiosSingletonInstance(config?: AxiosRequestConfig) {
    if (axiosInstance) {
        console.log("Retrieved singleton instance");
        return axiosInstance;
    }

    return createAxiosSingletonInstance(config);
}

export function axiosClient() {
    return axiosSingletonInstance();
}
