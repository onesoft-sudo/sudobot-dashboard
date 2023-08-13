import { AxiosResponse } from "axios";
import {
    FieldErrors,
    FieldNamesMarkedBoolean,
    FieldValues,
    UseFormGetFieldState,
    UseFormGetValues,
    UseFormRegister,
} from "react-hook-form";

export interface SettingCardProps {
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
    getFieldState: UseFormGetFieldState<FieldValues>;
    getValues: UseFormGetValues<FieldValues>;
    touchedFields: Partial<Readonly<FieldNamesMarkedBoolean<FieldValues>>>;
    data: AxiosResponse<any, any>["data"];
}
