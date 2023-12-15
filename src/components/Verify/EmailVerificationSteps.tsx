"use client";

import useStepper, { UseStepperOptions } from "@/hooks/useStepper";
import { TextField } from "@mui/material";
import { FC } from "react";
import Step from "../Stepper/Step";
import Steps from "../Stepper/Steps";
import Card from "./VerificationCard";

interface EmailVerificationStepsProps {}

const EmailVerificationSteps: FC<EmailVerificationStepsProps> = () => {
    const { sliderRef, instanceRef, next } = useStepper(
        {
            slideChanged() {
                console.log("slide changed");
            },
            drag: false,
        } as unknown as UseStepperOptions,
        []
    );

    return (
        <Card>
            <Steps ref={sliderRef}>
                <Step>
                    <TextField label="Email Address" fullWidth type="email" />
                    <p className="text-xs mt-1 pb-3 text-[#999]">
                        Enter your email here. We will send you a verification
                        code.
                    </p>
                </Step>

                <Step>
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
