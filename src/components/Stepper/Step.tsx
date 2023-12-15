"use client";

import { useStepperFromContext } from "@/hooks/useStepper";
import { ComponentProps } from "react";
import StepControls from "./StepControls";

const Step = ({
    children,
    next = true,
    back = true,
    ...props
}: ComponentProps<"div"> & { next?: boolean; back?: boolean }) => {
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
                    next={next && currentStep < maxSteps}
                    back={back && currentStep > 0}
                    onNext={() => goNext()}
                    onBack={() => goBack()}
                    className="pt-3"
                />
            )}
        </div>
    );
};

export default Step;
