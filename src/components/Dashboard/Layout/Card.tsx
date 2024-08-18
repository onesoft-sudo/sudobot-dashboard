"use client";

import EntitySelect from "@/components/Form/EntitySelect";
import Select from "@/components/Form/Select";
import { FormContext, useFormContext } from "@/contexts/FormContext";
import { GuildConfigurationContext } from "@/contexts/GuildConfigurationContext";
import {
    Button,
    CircularProgress,
    Divider,
    Card as NextUICard,
    CardBody as NextUICardBody,
    CardHeader as NextUICardHeader,
    Switch,
} from "@nextui-org/react";
import React, { ComponentProps, FC, ForwardedRef, ReactNode, forwardRef, useContext } from "react";
import { Control, Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { IconType } from "react-icons/lib";

type CardProps = {
    nextUiCardProps?: ComponentProps<typeof NextUICard>;
    children: React.ReactNode;
    form?: UseFormReturn<any>;
    showSubmitButton?: boolean;
} & ComponentProps<"form">;

function Card({ children, form, nextUiCardProps, showSubmitButton, ...props }: CardProps) {
    return (
        <FormContext.Provider value={{ form, showSubmitButton }}>
            <form {...props}>
                <NextUICard shadow="sm" {...nextUiCardProps}>
                    {children}
                </NextUICard>
            </form>
        </FormContext.Provider>
    );
}

type CardHeaderProps = {
    icon: IconType;
    title: string;
    switchName?: string;
};

type CardBodyProps = {
    children: React.ReactNode;
};

type CardFormProps = {
    children: React.ReactNode;
};

Card.Header = function CardHeader({ icon: Icon, title, switchName }: CardHeaderProps) {
    const { isRefetching } = useContext(GuildConfigurationContext) ?? {};
    const { form } = useFormContext();
    const refreshing = !!isRefetching?.();

    return (
        <NextUICardHeader className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
                <Icon size="2rem" />
                <div className="flex flex-col">
                    <div className="text-base">{title}</div>
                </div>
            </div>
            {switchName && (
                <Controller
                    control={form?.control}
                    name={switchName}
                    disabled={refreshing}
                    render={({ field }) => (
                        <Switch isSelected={!!field.value} onValueChange={field.onChange} isDisabled={refreshing} />
                    )}
                />
            )}
        </NextUICardHeader>
    );
};

Card.Body = function CardBody({ children }: CardBodyProps) {
    return (
        <>
            <Divider />
            <NextUICardBody>{children}</NextUICardBody>
        </>
    );
};

Card.FormBody = function CardFormBody({ children }: CardFormProps) {
    const { isRefetching } = useContext(GuildConfigurationContext) ?? {};

    return (
        <Card.Body>
            {isRefetching?.() ? (
                <div className="flex items-center justify-center">
                    <CircularProgress />
                </div>
            ) : (
                children
            )}
        </Card.Body>
    );
};

Card.FormSubmit = function CardFormSubmit({
    children = "Submit",
    type = "submit",
    ...props
}: ComponentProps<typeof Button>) {
    const { form, showSubmitButton } = useFormContext();

    if (!showSubmitButton && (!form?.formState?.isDirty || form.formState.isSubmitSuccessful)) {
        return null;
    }

    return (
        <Button type={type} fullWidth isLoading={form?.formState?.isSubmitting} {...props}>
            {children}
        </Button>
    );
};

function CardFormControl<T extends FC | keyof JSX.IntrinsicElements>(
    { component, children, ...props }: ComponentProps<T> & { component: T; children?: ReactNode; name?: string },
    ref: ForwardedRef<any>,
) {
    const { form } = useFormContext();
    const Component = component as unknown as FC<ComponentProps<T>>;
    let error: unknown = form?.formState?.errors;

    if (error) {
        for (const key of props.name?.split(".") ?? []) {
            error = (error as Record<string, string>)?.[key];
        }
    }

    return (
        <Component
            ref={ref}
            errorMessage={
                props.name
                    ? ((error as unknown as { message?: string } | undefined)?.message as unknown as string)
                    : undefined
            }
            isInvalid={props.name ? !!(error as unknown as { message?: string } | undefined)?.message : undefined}
            {...(props as ComponentProps<typeof Component>)}
        >
            {children}
        </Component>
    );
}

Card.FormControl = forwardRef(CardFormControl) as typeof CardFormControl;

Card.FormSelect = forwardRef(function CardFormSelect<T extends FieldValues>(
    {
        children,
        control,
        ...props
    }: Omit<ComponentProps<typeof Select<T>>, "control"> & {
        control?: Control<any>;
    },
    ref: ForwardedRef<any>,
) {
    const { form } = useFormContext();

    let error: unknown = form?.formState?.errors;

    if (error) {
        for (const key of props.name?.split(".") ?? []) {
            error = (error as Record<string, string>)?.[key];
        }
    }

    return (
        <Select<T>
            ref={ref}
            control={(control ?? form?.control) as Control<T>}
            errorMessage={
                props.name
                    ? ((error as unknown as { message?: string } | undefined)?.message as unknown as string)
                    : undefined
            }
            isInvalid={props.name ? !!(error as unknown as { message?: string } | undefined)?.message : undefined}
            {...props}
        >
            {children}
        </Select>
    );
});

Card.FormEntitySelect = function CardFormEntitySelect<T extends FieldValues>({
    control,
    name,
    ...props
}: ComponentProps<typeof EntitySelect> & {
    control?: Control<any>;
}) {
    const { form } = useFormContext();

    let error: unknown = form?.formState?.errors;

    if (error) {
        for (const key of name?.split(".") ?? []) {
            error = (error as Record<string, string>)?.[key];
        }
    }

    return (
        <EntitySelect<T>
            control={(control ?? form?.control) as Control<T>}
            errorMessage={
                name
                    ? ((error as unknown as { message?: string } | undefined)?.message as unknown as string)
                    : undefined
            }
            isInvalid={name ? !!(error as unknown as { message?: string } | undefined)?.message : undefined}
            name={name as Path<T>}
            {...(props as any)}
        />
    );
};

export default Card;
