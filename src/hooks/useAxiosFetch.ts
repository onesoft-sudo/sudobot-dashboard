import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";

interface UseAxiosFetchState {
    error: AxiosError | null;
    response: AxiosResponse | null;
    loading: boolean;
}

export default function useAxiosFetch() {
    const [state, setState] = useState<UseAxiosFetchState>({ error: null, response: null, loading: false });
    const { user } = useAuthContext();

    const request = async (options: AxiosRequestConfig) => {
        setState(state => ({ ...state, error: null, response: null, loading: true }));

        try {
            const response = await axios.request({
                ...options,
                headers: user ? {
                    'Authorization': `Bearer ${encodeURIComponent(user.token)}`
                } : {}
            });

            setState(state => ({ ...state, error: null, loading: false, response }));
            return response;            
        }
        catch (error: any) {
            console.log(error);
            setState(state => ({ ...state, loading: false, response: null, error }));
        }
    };

    return { state, request };
}