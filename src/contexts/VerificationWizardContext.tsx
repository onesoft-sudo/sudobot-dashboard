"use client";

import { PropsWithChildren, createContext, useReducer } from "react";

type VerificationWizardContextState = {
    step: number;
    maxSteps: number;
    setStep: (step: number) => void;
    back: () => void;
    next: () => void;
    lastAction?: "back" | "next";
    method?: VerificationMethod;
    setMethod: (method: VerificationMethod) => void;
};

export enum VerificationMethod {
    Google,
    GitHub,
    Email,
    Captcha,
}

type VerificationWizardContextAction =
    | {
          type: "SET_METHOD";
          payload: VerificationMethod;
      }
    | {
          type: "SET_STEP";
          payload: number;
      }
    | {
          type: "STEP_NEXT";
      }
    | {
          type: "STEP_BACK";
      };

const reducer = (
    state: VerificationWizardContextState,
    action: VerificationWizardContextAction
): VerificationWizardContextState => {
    console.log(state);

    switch (action.type) {
        case "SET_METHOD":
            return { ...state, method: action.payload };
        case "SET_STEP":
            return { ...state, step: action.payload };
        case "STEP_BACK":
            if (state.step === 0) {
                return state;
            }
            return { ...state, step: state.step - 1, lastAction: "back" };
        case "STEP_NEXT":
            if (state.step >= state.maxSteps) {
                return state;
            }
            return { ...state, step: state.step + 1, lastAction: "next" };
        default:
            return state;
    }
};

export const VerificationWizardContext = createContext<
    VerificationWizardContextState | undefined
>(undefined);

export const VerificationWizardContextProvider = ({
    children,
    maxSteps,
}: PropsWithChildren & { maxSteps: number }) => {
    const [state, dispatch] = useReducer(reducer, {
        step: 0,
        back() {
            dispatch({
                type: "STEP_BACK",
            });
        },
        next() {
            dispatch({
                type: "STEP_NEXT",
            });
        },
        setMethod(method: VerificationMethod) {
            dispatch({
                type: "SET_METHOD",
                payload: method,
            });
        },
        lastAction: undefined,
        maxSteps,
        method: undefined,
        setStep(step) {
            dispatch({
                type: "SET_STEP",
                payload: step,
            });
        },
    });

    return (
        <VerificationWizardContext.Provider value={state}>
            {children}
        </VerificationWizardContext.Provider>
    );
};
