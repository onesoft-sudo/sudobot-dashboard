"use client";

import { StepperContextProvider } from "@/contexts/StepperContext";
import EmailVerificationSteps from "./EmailVerificationSteps";

export default function EmailVerification() {
    return (
        <StepperContextProvider maxSteps={3}>
            <EmailVerificationSteps />
        </StepperContextProvider>
    );
}
