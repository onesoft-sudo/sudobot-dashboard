"use client";

import { useDialogContext } from "@/contexts/DialogContext";
import { useTheme } from "@/hooks/theme";
import { Button } from "@nextui-org/react";
import { ComponentProps, type FC } from "react";
import { twMerge } from "tailwind-merge";

type DialogActionButtonProps = ComponentProps<typeof Button> & {
    autoClose?: boolean;
    label?: string;
};

const DialogActionButton: FC<DialogActionButtonProps> = (props) => {
    const { onClose } = useDialogContext();
    const { mode } = useTheme();

    return (
        <Button
            {...props}
            variant={props.variant || "flat"}
            onClick={(event) => {
                if (props.onClick) {
                    props.onClick(event);
                }

                if (props?.autoClose !== false) {
                    onClose?.();
                }
            }}
            className={twMerge(
                (props.color === "default" || props.color === undefined) && mode === "light"
                    ? "text-[#333] bg-[#bbb]"
                    : "",
                props.className,
            )}
        >
            {props.children || props.label || "OK"}
        </Button>
    );
};

export default DialogActionButton;
