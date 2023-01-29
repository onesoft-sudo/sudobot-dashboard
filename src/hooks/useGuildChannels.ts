import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { getChannels } from "../api/info";
import { useAuthContext } from "../contexts/AuthContext";

export default function useGuildChannels(guild: string, options: UseQueryOptions<any>) {
    const { user } = useAuthContext();

    return useQuery({
        enabled: !!user,
        queryKey: ['channels', guild, user?.token],
        queryFn: getChannels,
        ...options
    } as any) as UseQueryResult<AxiosResponse<any, any>>;
}