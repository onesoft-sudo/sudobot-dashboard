"use client";

import { FormContext, useFormContext } from "@/contexts/FormContext";
import {
    Button,
    CircularProgress,
    Divider,
    Card as NextUICard,
    CardBody as NextUICardBody,
    CardHeader as NextUICardHeader,
} from "@nextui-org/react";
import { ComponentProps } from "react";
import { Control, FieldValues, FormState } from "react-hook-form";
import { IconType } from "react-icons/lib";

function Card({ children, ...props }: ComponentProps<typeof NextUICard>) {
    return (
        <NextUICard shadow="sm" {...props}>
            {children}
        </NextUICard>
    );
}

type CardHeaderProps = {
    icon: IconType;
    title: string;
};

type CardBodyProps = {
    children: React.ReactNode;
};

type CardFormProps = ComponentProps<"form"> & {
    children: React.ReactNode;
    control?: Control<FieldValues>;
    formState?: FormState<FieldValues>;
};

Card.Header = function CardHeader({ icon: Icon, title }: CardHeaderProps) {
    return (
        <NextUICardHeader className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
                <Icon size="2rem" />
                <div className="flex flex-col">
                    <div className="text-base">{title}</div>
                </div>
            </div>
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

Card.Form = function CardForm({ children, control, formState, ...props }: CardFormProps) {
    return (
        <Card.Body>
            <FormContext.Provider value={{ control, formState }}>
                {formState?.isSubmitSuccessful ? (
                    <div className="flex items-center justify-center">
                        <CircularProgress />
                    </div>
                ) : (
                    <form {...props}>{children}</form>
                )}
            </FormContext.Provider>
        </Card.Body>
    );
};

Card.FormSubmit = function CardFormSubmit({
    children = "Submit",
    type = "submit",
    ...props
}: ComponentProps<typeof Button>) {
    const { formState } = useFormContext();

    if (!formState?.isDirty || formState.isSubmitSuccessful) {
        return null;
    }

    return (
        <Button type={type} {...props} isLoading={formState?.isSubmitting}>
            {children}
        </Button>
    );
};

export default Card;
