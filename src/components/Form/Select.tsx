import { Select as NextUISelect } from "@nextui-org/react";
import { ComponentProps } from "react";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";

type SelectProps<T extends FieldValues> = ComponentProps<typeof NextUISelect> & {
    control: UseFormReturn<T>["control"];
    name: Path<T>;
};

const Select = <T extends FieldValues>({ control, name, children, ...props }: SelectProps<T>) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <NextUISelect
                    selectedKeys={props.selectionMode === "single" ? new Set([field.value]) : field.value}
                    name={name}
                    onSelectionChange={(selectedKeys) => {
                        const keys = Array.from(selectedKeys);
                        field.onChange(props.selectionMode === "single" ? keys[0] : keys);
                    }}
                    {...props}
                >
                    {children}
                </NextUISelect>
            )}
        />
    );
};

export default Select;
