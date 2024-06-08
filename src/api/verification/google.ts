import { getAxiosClient } from "@/client/axios";
import { Route } from "../Routes";

export const verifyByGoogle = async (code: string, token: string) => {
    const response = await getAxiosClient().post(Route.VERIFY_BY_GOOGLE, {
        code,
        token,
    });

    return {
        success: true,
        data: response.data,
    };
};
