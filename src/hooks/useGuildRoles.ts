import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { getRoles } from "../api/info";
import { useAuthContext } from "../contexts/AuthContext";

export default function useGuildRoles(guild: string, options: UseQueryOptions<any> = {}) {
    const { user } = useAuthContext();

    return useQuery({
        enabled: !!user,
        queryKey: ['roles', guild, user?.token],
        queryFn: getRoles,
        ...options
    } as any) as UseQueryResult<AxiosResponse<any, any>>;
}