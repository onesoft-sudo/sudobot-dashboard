"use client";

import { useStepperFromContext } from "@/hooks/useStepper";
import { LinearProgress } from "@mui/material";
import { ComponentProps } from "react";
import StepControls from "./StepControls";

type Awaitable<T> = Promise<T> | T;

const Step = ({
    children,
    next = true,
    back = true,
    onNext,
    onBack,
    isLoading = false,
    ...props
}: ComponentProps<"div"> & {
    next?: boolean;
    back?: boolean;
    onNext?: () => Awaitable<boolean | undefined | void>;
    onBack?: () => Awaitable<boolean | undefined | void>;
    isLoading?: boolean;
}) => {
    const {
        next: goNext,
        back: goBack,
        currentStep,
        maxSteps,
    } = useStepperFromContext(false);

    return (
        <div
            {...props}
            className={`relative keen-slider__slide rounded-[10px] w-[90vw] md:w-[40vw] lg:w-[25vw] xl:w-[17vw] p-3 bg-[#222] flex flex-col justify-between ${props.className}`}
        >
            <div>{children}</div>

            {(next || back) && (
                <StepControls
                    next={next && currentStep < maxSteps - 2}
                    back={back && currentStep > 0}
                    onNext={async () => {
                        if ((await onNext?.()) === false) {
                            return;
                        }

                        goNext();
                    }}
                    onBack={async () => {
                        if ((await onBack?.()) === false) {
                            return;
                        }

                        goBack();
                    }}
                    className="pt-3"
                />
            )}

            {isLoading && (
                <div className="absolute top-0 left-0 w-[100%] h-[100%] bg-[rgba(255,255,255,0.2)] z-[1000]">
                    <LinearProgress />
                </div>
            )}
        </div>
    );
};

export default Step;
