import { API } from "@/utils/api";
import axios from "axios";

type ValidateCaptchaResponseType = {
    success: boolean;
};

export function validateCaptchaResponse(response: string) {
    return axios.post<ValidateCaptchaResponseType>(API.verify(), {
        responseToken: response,
    });
}
