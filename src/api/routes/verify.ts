import { API } from "@/utils/api";
import axios, { AxiosResponse } from "axios";

type ValidateCaptchaResponseType = {
    success: boolean;
};

export type VerificationInfo = {
    userId: string;
    guildId: string;
    guildName: string;
    token: string;
    createdAt: Date;
};

export function validateCaptchaResponse(payload: {
    verificationToken: string;
    responseToken: string;
    userId: string;
}) {
    return axios.post<ValidateCaptchaResponseType>(API.verify(), payload);
}

// FIXME
export async function getVerificationInfo(
    token: string
): Promise<AxiosResponse<VerificationInfo, any>> {
    return {
        config: null as any,
        data: {
            createdAt: new Date(),
            guildId: "964969362073198652",
            guildName: "The Super Place",
            token,
            userId: "2482473642578546",
        },
        headers: null as any,
        status: 200,
        statusText: "OK",
    };
}
