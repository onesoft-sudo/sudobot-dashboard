import { getAxiosClient } from "@/client/axios";
import { Guild } from "@/types/Guild";
import { AxiosError } from "axios";

export const getGuild = async (id: string): Promise<Guild | null> => {
    try {
        const response = await getAxiosClient().get<Guild>(`/guilds/${encodeURIComponent(id)}`);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response?.status === 404) {
                return null;
            }

            throw new Error("Failed to fetch guild", {
                cause: {
                    code: error.response?.data.code ?? undefined,
                },
            });
        }

        throw error;
    }
};

export const getGuilds = async (ids: string[]): Promise<Guild[]> => {
    if (ids.length === 0) {
        return [];
    }

    try {
        const response = await getAxiosClient().get<Guild[]>(`/guilds`);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error("Failed to fetch guilds", {
                cause: {
                    code: error.response?.data.code ?? undefined,
                },
            });
        }

        throw error;
    }
};
