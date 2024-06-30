"use client";

import clsx from "clsx";
import { ComponentProps, type FC } from "react";
import DialogActionButton from "./DialogActionButton";

type DialogPrimaryActionButtonProps = ComponentProps<typeof DialogActionButton>;

const DialogPrimaryActionButton: FC<DialogPrimaryActionButtonProps> = (props) => {
    return (
        <DialogActionButton
            {...props}
            variant={props.variant || "solid"}
            className={clsx(
                {
                    "bg-gradient-to-b from-blue-600 to-blue-700 text-white": !props.color,
                },
                props.className,
            )}
        >
            {props.children || props.label || "OK"}
        </DialogActionButton>
    );
};

export default DialogPrimaryActionButton;
