"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { AxiosRequestConfig } from "axios";

export default function useAxios(config?: AxiosRequestConfig) {
    const { axios } = useAuthContext();
    return axios;
}
