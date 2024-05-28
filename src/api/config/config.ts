import { getAxiosClient } from "@/client/axios";
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
