import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export interface SettingCardProps {
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
}
