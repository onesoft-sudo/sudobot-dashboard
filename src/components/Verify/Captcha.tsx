"use client";

import { validateCaptchaResponse } from "@/api/routes/verify";
import { Alert, CircularProgress } from "@mui/material";
import { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { MdCheck } from "react-icons/md";

const recaptchaSuccessCallbackName = "recaptchaSuccess";

declare global {
    interface Window
        extends Record<
            typeof recaptchaSuccessCallbackName,
            Function | undefined
        > {}
}

const Captcha: FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const params = useSearchParams();

    const onSuccess = async (responseToken: string) => {
        setIsLoading(true);

        try {
            const response = await validateCaptchaResponse({
                responseToken,
                verificationToken: params?.get("t")!,
                userId: params?.get("u")!,
            });

            if (!response.data.success) {
                throw new AxiosError(
                    "Request unsuccessful",
                    response.status.toString(),
                    undefined,
                    undefined,
                    response
                );
            }

            setIsSuccess(true);
        } catch (error) {
            if (error instanceof AxiosError) {
                setError(
                    error.response?.data.error ??
                        "We were unable to verify you."
                );
            } else {
                console.log(error);
                setError(
                    "An internal error has occurred. Please try again later."
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        window[recaptchaSuccessCallbackName] = onSuccess;

        return () => {
            delete window[recaptchaSuccessCallbackName];
        };
    }, []);

    return (
        <div className=" flex justify-center items-center w-[100%] flex-col gap-5">
            {error && (
                <Alert severity="error" className="w-[100%]">
                    {error}
                </Alert>
            )}
            {isSuccess && (
                <div className="text-center flex justify-center items-center flex-col">
                    <MdCheck size={50} />
                    <br />
                    <p>
                        We&rsquo;ve successfully verified you.
                        <br />
                        <span className="text-[#999]">
                            You can close this tab/window now.
                        </span>
                    </p>
                </div>
            )}
            {!isSuccess && (
                <div
                    className="g-recaptcha invert"
                    data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    data-callback="recaptchaSuccess"
                ></div>
            )}
            {isLoading && (
                <p className="flex items-center justify-center text-center py-2 gap-3">
                    <CircularProgress size={20} /> Working...
                </p>
            )}
        </div>
    );
};

export default Captcha;
