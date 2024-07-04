import { createContext, useContext } from "react";
import { Control, FieldValues, FormState } from "react-hook-form";

type FormContextType = {
    control?: Control<FieldValues>;
    formState?: FormState<FieldValues>;
};

export const FormContext = createContext<FormContextType | undefined>(undefined);

export function useFormContext() {
    const context = useContext(FormContext);

    if (!context) {
        throw new Error("useFormContext() must be used within a <FormProvider>");
    }

    return context;
}
