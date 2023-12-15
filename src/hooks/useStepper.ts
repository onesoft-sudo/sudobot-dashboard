"use client";

import {
    StepperContext,
    StepperContextActionType,
} from "@/contexts/StepperContext";
import {
    KeenSliderHooks,
    KeenSliderInstance,
    useKeenSlider,
} from "keen-slider/react";
import { MutableRefObject, useContext, useEffect } from "react";

export type UseStepperOptions = Parameters<typeof useKeenSlider>[0];

export function useStepperFromContext(updateOnMount?: boolean) {
    const { instanceRef, sliderRef } = useContext(StepperContext)!;
    return useStepperWithRefs(sliderRef!, instanceRef!);
}

export class StepperEvent extends Event {
    constructor(type: string, public readonly step: number) {
        super(type, {
            cancelable: false,
        });
    }
}

export function useStepperWithRefs(
    sliderRef: (node: HTMLElement | null) => void,
    instanceRef: MutableRefObject<KeenSliderInstance<
        {},
        {},
        KeenSliderHooks
    > | null>,
    updateOnMount = true
) {
    const { currentStep, maxSteps, dispatch, eventTarget } =
        useContext(StepperContext)!;

    useEffect(() => {
        if (!updateOnMount) {
            return;
        }

        dispatch({
            type: StepperContextActionType.SetInstance,
            payload: instanceRef,
        });

        return () => {
            if (!updateOnMount) return;
            dispatch({
                type: StepperContextActionType.SetInstance,
                payload: undefined,
            });
        };
    }, []);

    const next = (interval: number = 1) => {
        if (currentStep + interval <= maxSteps) {
            dispatch({
                type: StepperContextActionType.SetStep,
                payload: currentStep + interval,
            });

            instanceRef.current?.next();

            eventTarget.dispatchEvent(
                new StepperEvent("stepperNext", currentStep + interval)
            );
            eventTarget.dispatchEvent(
                new StepperEvent("stepperChange", currentStep + interval)
            );
        }
    };

    const back = (interval: number = 1) => {
        if (currentStep - interval >= 0) {
            dispatch({
                type: StepperContextActionType.SetStep,
                payload: currentStep - interval,
            });

            instanceRef.current?.prev();

            eventTarget.dispatchEvent(
                new StepperEvent("stepperBack", currentStep - interval)
            );
            eventTarget.dispatchEvent(
                new StepperEvent("stepperChange", currentStep - interval)
            );
        }
    };

    const setStep = (step: number) => {
        if (step <= maxSteps) {
            dispatch({
                type: StepperContextActionType.SetStep,
                payload: step,
            });

            instanceRef.current?.moveToIdx(step);
            eventTarget.dispatchEvent(new StepperEvent("stepperChange", step));
        }
    };

    const reset = () => {
        dispatch({
            type: StepperContextActionType.SetStep,
            payload: 0,
        });

        instanceRef.current?.moveToIdx(0);
        eventTarget.dispatchEvent(new StepperEvent("stepperChange", 0));
    };

    return {
        back,
        next,
        setStep,
        reset,
        currentStep,
        maxSteps,
        dispatch,
        sliderRef,
        instanceRef,
    };
}

export default function useStepper(...args: Parameters<typeof useKeenSlider>) {
    const [sliderRef, instanceRef] = useKeenSlider(...args);
    return useStepperWithRefs(sliderRef, instanceRef);
}
