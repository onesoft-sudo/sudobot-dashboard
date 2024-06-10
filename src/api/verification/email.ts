import { getAxiosClient } from "@/client/axios";
import { AxiosError } from "axios";
import { Route } from "../Routes";

export const finishEmailVerification = async (email: string, token: string, emailToken: string) => {
    try {
        const response = await getAxiosClient().post(Route.VERIFICATION_FINISH_EMAIL, {
            token,
            emailToken,
            email,
        });

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        if (error instanceof AxiosError && error.response?.data.error) {
            return {
                success: false,
                error: error.response?.data.error,
            };
        }

        return {
            success: false,
            error: "An unknown error occurred. Please try again later.",
        };
    }
};
