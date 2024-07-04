import { getAxiosClient } from "@/client/axios";
import { GuildConfiguration } from "@/types/GuildConfiguration";
import { AxiosError } from "axios";

export const updateConfig = async (guildId: string, payload: Record<string, unknown>): Promise<boolean> => {
    try {
        await getAxiosClient().patch(`/guilds/${encodeURIComponent(guildId)}/config`, payload);
        return true;
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response?.status === 404) {
                return false;
            }

            throw new Error("Failed to update configuration", {
                cause: {
                    code: error.response?.data.code ?? undefined,
                },
            });
        }

        throw error;
    }
};

export const fetchConfig = async (guildId: string): Promise<GuildConfiguration | null> => {
    try {
        return (await getAxiosClient().get<GuildConfiguration>(`/guilds/${encodeURIComponent(guildId)}/config`)).data;
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response?.status === 404) {
                return null;
            }

            throw new Error("Failed to fetch configuration", {
                cause: {
                    code: error.response?.data.code ?? undefined,
                },
            });
        }

        throw error;
    }
};
