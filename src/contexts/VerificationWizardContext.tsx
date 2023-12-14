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
    nextDisabled: boolean;
    disableNext: (payload?: boolean) => void;
    backDisabled: boolean;
    disableBack: (payload?: boolean) => void;
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
      }
    | {
          type: "SET_NEXT_DISABLED";
          payload?: boolean;
      }
    | {
          type: "SET_BACK_DISABLED";
          payload?: boolean;
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
        case "SET_NEXT_DISABLED":
            return {
                ...state,
                nextDisabled:
                    action.payload === undefined ? true : !state.nextDisabled,
            };
        case "SET_BACK_DISABLED":
            return {
                ...state,
                backDisabled:
                    action.payload === undefined ? true : !state.backDisabled,
            };
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
            if (state.nextDisabled) {
                return;
            }

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
        nextDisabled: false,
        disableNext(payload?: boolean) {
            if (payload === state.nextDisabled) {
                return;
            }

            dispatch({
                type: "SET_NEXT_DISABLED",
                payload,
            });
        },
        backDisabled: false,
        disableBack(payload?: boolean) {
            if (payload === state.backDisabled) {
                return;
            }

            dispatch({
                type: "SET_BACK_DISABLED",
                payload,
            });
        },
    });

    return (
        <VerificationWizardContext.Provider value={state}>
            {children}
        </VerificationWizardContext.Provider>
    );
};
