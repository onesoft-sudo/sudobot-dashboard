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
    icon?: string;
    createdAt: Date;
};

export function validateCaptchaResponse(payload: {
    verificationToken: string;
    responseToken: string;
    userId: string;
}) {
    return axios.post<ValidateCaptchaResponseType>(
        API.verifyByCaptcha(),
        payload
    );
}

// FIXME
export async function getVerificationInfo(
    token: string,
    userId: string
): Promise<AxiosResponse<VerificationInfo, any>> {
    return axios.get(
        `${API.verify()}?token=${encodeURIComponent(
            token
        )}&userId=${encodeURIComponent(userId)}`
    );
}
