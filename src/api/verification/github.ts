import { getAxiosClient } from "@/client/axios";
import { Route } from "../Routes";

export const verifyByGitHub = async (code: string, token: string) => {
    const response = await getAxiosClient().post(Route.VERIFY_BY_GITHUB, {
        code,
        token,
    });

    return {
        success: true,
        data: response.data,
    };
};
