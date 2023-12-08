import { API } from "@/utils/api";
import axios from "axios";

type ValidateCaptchaResponseType = {
    success: boolean;
};

export function validateCaptchaResponse(payload: {
    verificationToken: string;
    responseToken: string;
    userId: string;
}) {
    return axios.post<ValidateCaptchaResponseType>(API.verify(), payload);
}
