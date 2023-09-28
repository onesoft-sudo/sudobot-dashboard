import { AxiosResponse } from "axios";
import {
    FieldErrors,
    FieldNamesMarkedBoolean,
    FieldValues,
    UseFormClearErrors,
    UseFormGetFieldState,
    UseFormGetValues,
    UseFormRegister,
    UseFormReset,
    UseFormSetError,
    UseFormSetValue,
} from "react-hook-form";

export interface SettingCardProps {
    reset: UseFormReset<FieldValues>;
    clearErrors: UseFormClearErrors<FieldValues>;
    setError: UseFormSetError<FieldValues>;
    register: UseFormRegister<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;
    errors: FieldErrors<FieldValues>;
    getFieldState: UseFormGetFieldState<FieldValues>;
    getValues: UseFormGetValues<FieldValues>;
    touchedFields: Partial<Readonly<FieldNamesMarkedBoolean<FieldValues>>>;
    data: AxiosResponse<any, any>["data"];
}
