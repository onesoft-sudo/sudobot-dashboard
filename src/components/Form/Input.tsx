"use client";

import { useFormContext } from "@/contexts/FormContext";
import { Input as NextUIInput } from "@nextui-org/react";
import { ComponentProps } from "react";
import { Controller } from "react-hook-form";

type InputProps = ComponentProps<typeof NextUIInput> & {
    name: string;
    rules: ComponentProps<typeof Controller>["rules"];
};

export default function Input({ name, rules, ...props }: InputProps) {
    const { form } = useFormContext();

    return (
        <Controller
            name={name}
            control={form?.control}
            defaultValue={props.defaultValue}
            disabled={props.disabled}
            render={({ field: { name, onChange, value } }) => {
                return (
                    <NextUIInput
                        name={name}
                        value={value}
                        onChange={(event) => {
                            onChange(event);
                            props.onChange?.(event);
                        }}
                        {...props}
                    />
                );
            }}
        />
    );
}
