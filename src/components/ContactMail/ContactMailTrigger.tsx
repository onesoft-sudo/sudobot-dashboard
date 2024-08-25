import { ComponentProps, MouseEvent, type FC } from "react";
import { useContactMail } from "./useContactMail";

type ContactMailTriggerProps<
    T extends
        | FC<Record<string | number, unknown>>
        | keyof JSX.IntrinsicElements = "div",
> = {
    as?: T;
} & ComponentProps<T>;

const ContactMailTrigger = <
    T extends
        | FC<Record<string | number, unknown>>
        | keyof JSX.IntrinsicElements = "div",
>({
    as: As = "div" as T,
    ...props
}: ContactMailTriggerProps<T>) => {
    const { toggle } = useContactMail();
    const Component = As as FC<Record<string | number, unknown>>;
    let children: unknown = undefined;

    if ("children" in props) {
        children = props.children;
        props = { ...props, children: undefined };
    }

    return (
        <Component
            {...(props as Record<string | number, unknown>)}
            onClick={
                ((event: MouseEvent) => {
                    console.log("ContactMailTrigger onClick");
                    event.preventDefault();
                    toggle();

                    if (typeof props.onClick === "function")
                        props.onClick?.(event);

                    event.stopPropagation();
                }) as unknown
            }
        >
            {children}
        </Component>
    );
};

export default ContactMailTrigger;
