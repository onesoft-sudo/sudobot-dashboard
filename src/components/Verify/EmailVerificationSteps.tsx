"use client";

import { axiosClient } from "@/api/axios";
import useStepper, { UseStepperOptions } from "@/hooks/useStepper";
import { Alert, TextField } from "@mui/material";
import { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";
import { FC, useRef, useState } from "react";
import { z } from "zod";
import Step from "../Stepper/Step";
import Steps from "../Stepper/Steps";
import Card from "./VerificationCard";

interface EmailVerificationStepsProps {}

const zodEmailSchema = z.string().email();

const FirstStep = ({
    onComplete,
    email: savedEmail,
}: {
    onComplete: (email: string) => void;
    email?: string;
}) => {
    const [error, setError] = useState<string | null>(null);
    const [state, setState] = useState<
        "idle" | "loading" | "success" | "error" | "ratelimit"
    >("idle");
    const inputRef = useRef<HTMLInputElement>(null);
    const searchParams = useSearchParams();

    const isLoading = state === "loading";

    const validate = () =>
        inputRef.current?.value?.trim() &&
        zodEmailSchema.safeParse(inputRef.current?.value).success;

    const triggerError = () =>
        setError("Please enter a valid email to verify!");

    const onSubmit = async () => {
        setState("loading");
        const email = inputRef.current?.value;

        try {
            const response = await axiosClient().post(
                "/api/verify/email",
                {
                    verificationToken: searchParams?.get("t"),
                    email,
                    userId: searchParams?.get("u"),
                },
                {
                    baseURL: "",
                }
            );

            console.info("response", response);
            setState("success");
            onComplete(email!);
            return true;
        } catch (error) {
            console.error(error);

            if (error instanceof AxiosError && error.response?.status === 429) {
                setState("ratelimit");
            } else {
                setState("error");
            }
            return false;
        }
    };

    return (
        <Step
            onNext={() => {
                if (!validate()) {
                    triggerError();
                    return false;
                }

                if (savedEmail === inputRef.current?.value) {
                    return true;
                }

                return onSubmit();
            }}
            isLoading={isLoading}
        >
            <h3 className="text-center md:text-xl pb-4">Enter your email</h3>
            {state === "error" && (
                <Alert severity="error" className="mb-3">
                    An error occured while trying to process this request.
                </Alert>
            )}
            {state === "ratelimit" && (
                <Alert severity="error" className="mb-3">
                    Too many requests at the same time, please try again later.
                </Alert>
            )}
            <TextField
                label="Email Address"
                fullWidth
                type="email"
                inputRef={inputRef}
                onChange={() => {
                    if (error && validate()) {
                        setError(null);
                        return;
                    }
                }}
                onKeyUp={event => {
                    if (event.key === "Enter") {
                        onSubmit();
                    }
                }}
            />
            {error && <p className="text-xs mt-1 pb-3 text-red-500">{error}</p>}
            <p className="text-xs mt-1 pb-3 text-[#999]">
                Enter your email here. We will send you a verification code.
            </p>
        </Step>
    );
};

const EmailVerificationSteps: FC<EmailVerificationStepsProps> = () => {
    const { sliderRef } = useStepper(
        {
            slideChanged() {
                console.log("slide changed");
            },
            drag: false,
        } as unknown as UseStepperOptions,
        []
    );
    const [email, setEmail] = useState<string | undefined>(undefined);

    return (
        <Card>
            <Steps ref={sliderRef}>
                <FirstStep email={email} onComplete={setEmail} />

                <Step>
                    <h3 className="text-center md:text-xl pb-4">
                        Enter verification code
                    </h3>
                    <TextField
                        label="Verification Code"
                        fullWidth
                        type="number"
                    />
                    <p className="text-xs mt-1 pb-3 text-[#999]">
                        Enter the verification code we&rsquo;ve just sent you.
                    </p>
                </Step>
            </Steps>
        </Card>
    );
};

export default EmailVerificationSteps;
