import { createContext, useContext } from "react";
import { UseFormReturn } from "react-hook-form";

type FormContextType = {
    form?: UseFormReturn<any>;
    showSubmitButton?: boolean;
};

export const FormContext = createContext<FormContextType | undefined>(undefined);

export function useFormContext() {
    const context = useContext(FormContext);

    if (!context) {
        throw new Error("useFormContext() must be used within a <FormProvider>");
    }

    return context;
}
