"use client";

import { validateCaptchaResponse } from "@/api/routes/verify";
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { AxiosError } from "axios";
import { FC, useEffect, useState } from "react";

const recaptchaSuccessCallbackName = "recaptchaSuccess";

declare global {
    interface Window
        extends Record<
            typeof recaptchaSuccessCallbackName,
            Function | undefined
        > {}
}

const Captcha: FC = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const onSuccess = async (responseToken: string) => {
        try {
            const response = await validateCaptchaResponse(responseToken);

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
                <Dialog
                    open={isAlertOpen}
                    onClose={() => setIsAlertOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Verification Completed"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            We've successfully verified that you're not a robot.
                            You&rsquo;ll be authorized shortly.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setIsAlertOpen(false)}>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
            <div
                className="g-recaptcha invert"
                data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                data-callback="recaptchaSuccess"
            ></div>
        </div>
    );
};

export default Captcha;
