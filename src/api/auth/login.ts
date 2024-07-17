import { getAxiosClient } from "@/client/axios";
import { APIErrorCode } from "@/types/APIErrorCode";
import { Guild } from "@/types/Guild";
import { User } from "@/types/User";
import { AxiosError } from "axios";
import { Route } from "../Routes";

export type LoginRequest = {
    username: string;
    password: string;
};

export type LoginResponse = {
    token: string;
    expires: number;
    user: User;
    guilds: Guild[];
};

export const requestLogin = async (data: LoginRequest): Promise<LoginResponse> => {
    try {
        const response = await getAxiosClient().post<LoginResponse>(Route.AUTH_LOGIN, data);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response?.data?.code === APIErrorCode.InvalidCredentials) {
                throw new Error("Invalid credentials", {
                    cause: {
                        code: error.response.data.code,
                    },
                });
            }

            if (error.response?.data?.code === APIErrorCode.AccountDisabled) {
                throw new Error("Account disabled", {
                    cause: {
                        code: error.response.data.code,
                    },
                });
            }

            throw new Error("Authentication failed", {
                cause: {
                    code: error.response?.data?.code ?? undefined,
                },
            });
        }

        throw error;
    }
};

export const requestLoginWithDiscord = async (code: string): Promise<LoginResponse> => {
    try {
        const response = await getAxiosClient().post<LoginResponse>(Route.AUTH_LOGIN_WITH_DISCORD, {
            code,
        });

        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response?.data?.code === APIErrorCode.InvalidCredentials) {
                throw new Error("Invalid credentials", {
                    cause: {
                        code: error.response.data.code,
                    },
                });
            }

            if (error.response?.data?.code === APIErrorCode.AccountDisabled) {
                throw new Error("Account disabled", {
                    cause: {
                        code: error.response.data.code,
                    },
                });
            }

            throw new Error("Authentication failed", {
                cause: {
                    code: error.response?.data?.code ?? undefined,
                },
            });
        }

        throw error;
    }
};
