import axios from "axios";

let client: ReturnType<typeof createAxiosClient> | null = null;
let token: string | undefined;

export function createAxiosClient() {
    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: {
            Authorization: localStorage ? "Bearer " + localStorage.getItem("token") : undefined,
        },
    });
}

export const setToken = (token?: string) => {
    if (!token) {
        delete getAxiosClient().defaults.headers.Authorization;
        return;
    }

    getAxiosClient().defaults.headers.Authorization = `Bearer ${token}`;
};

export const getAxiosClient = () => {
    if (!client) {
        client = createAxiosClient();
    }

    return client!;
};
