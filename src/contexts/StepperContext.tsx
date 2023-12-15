import { KeenSliderHooks, KeenSliderInstance } from "keen-slider/react";
import {
    Dispatch,
    FC,
    MutableRefObject,
    PropsWithChildren,
    createContext,
    useReducer,
} from "react";

interface StepperContextData {
    currentStep: number;
    maxSteps: number;
    dispatch: Dispatch<StepperContextAction>;
    instanceRef?: InstanceType;
    sliderRef?: (node: HTMLElement | null) => void;
    eventTarget: EventTarget;
}

type InstanceType = MutableRefObject<KeenSliderInstance<
    {},
    {},
    KeenSliderHooks
> | null>;

export enum StepperContextActionType {
    SetStep,
    SetInstance,
    SetSlider,
}

type StepperContextAction =
    | {
          type: StepperContextActionType.SetStep;
          payload: number;
      }
    | {
          type: StepperContextActionType.SetInstance;
          payload?: InstanceType;
      }
    | {
          type: StepperContextActionType.SetSlider;
          payload?: (node: HTMLElement | null) => void;
      };

const StepperContextReducer = (
    state: Omit<StepperContextData, "dispatch">,
    action: StepperContextAction
) => {
    switch (action.type) {
        case StepperContextActionType.SetStep:
            return { ...state, currentStep: action.payload };
        case StepperContextActionType.SetInstance:
            return { ...state, instanceRef: action.payload };
        case StepperContextActionType.SetSlider:
            return { ...state, sliderRef: action.payload };

        default:
            return state;
    }
};

export const StepperContext = createContext<StepperContextData | undefined>(
    undefined
);

export const StepperContextProvider: FC<
    PropsWithChildren & {
        maxSteps: number;
    }
> = ({ children, maxSteps }) => {
    const [state, dispatch] = useReducer(StepperContextReducer, {
        currentStep: 0,
        maxSteps,
        eventTarget: new EventTarget(),
    });

    return (
        <StepperContext.Provider value={{ ...state, dispatch }}>
            {children}
        </StepperContext.Provider>
    );
};
