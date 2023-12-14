"use client";

import useVerificationContext from "@/hooks/useVerificationContext";
import { Button } from "@mui/material";
import { FC } from "react";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";

export default function VerificationStep({
    callback: Callback,
    step,
}: {
    callback: FC;
    step: number;
}) {
    const {
        next,
        step: currentStep,
        maxSteps,
        back,
        nextDisabled,
        backDisabled,
    } = useVerificationContext();

    return (
        <div className="keen-slider__slide rounded-[10px] w-[90vw] md:w-[40vw] lg:w-[25vw] xl:w-[17vw] bg-[#222]">
            <div className="flex flex-col justify-between h-[100%] p-2">
                <div className="p-2">
                    {step === currentStep && <Callback />}
                </div>
                <div className="flex justify-between items-center">
                    {currentStep === 0 || backDisabled ? (
                        <div></div>
                    ) : (
                        <Button
                            startIcon={
                                <MdArrowLeft size={27} className="inline" />
                            }
                            onClick={back}
                        >
                            Back
                        </Button>
                    )}
                    {currentStep >= maxSteps || nextDisabled ? (
                        <div></div>
                    ) : (
                        <Button
                            endIcon={
                                <MdArrowRight size={27} className="inline" />
                            }
                            onClick={next}
                        >
                            Next
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
