import { cn, Switch } from "@nextui-org/react";
import { ComponentProps, forwardRef, Ref } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type CardSwitchProps<T extends FieldValues> = ComponentProps<typeof Switch> & {
    title?: string;
    description?: string;
    control?: Control<T, any>;
};

const CardSwitch = <T extends FieldValues>(
    { classNames, children, title, description, control, ...props }: CardSwitchProps<T>,
    ref: Ref<HTMLElement>,
) => {
    const finalSwitchProps = {
        classNames: {
            ...classNames,
            base: cn(
                "inline-flex flex-row-reverse bg-content2 items-center",
                "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent min-w-full",
                classNames?.base,
            ),
        },
        ...props,
    };

    const finalChildren = children ? (
        children
    ) : (
        <div className="flex flex-col gap-1">
            <p className="text-medium">{title}</p>
            {description && <p className="text-tiny text-default-400">{description}</p>}
        </div>
    );

    if (!control || !props.name) {
        return (
            <Switch ref={ref} {...finalSwitchProps}>
                {finalChildren}
            </Switch>
        );
    }

    return (
        <Controller
            name={props.name as Path<T>}
            control={control}
            render={({ field }) => (
                <Switch
                    ref={ref}
                    {...finalSwitchProps}
                    onValueChange={(value) => {
                        field.onChange(value);
                        finalSwitchProps.onValueChange?.(value);
                    }}
                >
                    {finalChildren}
                </Switch>
            )}
        />
    );
};

export default forwardRef(CardSwitch);
