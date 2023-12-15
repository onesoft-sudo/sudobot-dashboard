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

export async function initiateEmailVerification(
    token: string,
    userId: string,
    email: string,
    key: string
): Promise<
    AxiosResponse<
        {
            success: boolean;
            data: VerificationInfo & {
                meta: {
                    email: string;
                    emailVerificationToken: string;
                };
            };
        },
        any
    >
> {
    return axios.put(
        API.initiateEmailVerification(),
        {
            verificationToken: token,
            email,
            userId,
        },
        {
            headers: {
                "x-frontend-key": key,
            },
        }
    );
}
