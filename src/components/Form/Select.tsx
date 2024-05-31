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
                    selectedKeys={field.value}
                    name={name}
                    onSelectionChange={(selectedKeys) => field.onChange(Array.from(selectedKeys))}
                    {...props}
                >
                    {children}
                </NextUISelect>
            )}
        />
    );
};

export default Select;
