"use client";

import { ComponentProps, type FC } from "react";
import { twMerge } from "tailwind-merge";
import DialogActionButton from "./DialogActionButton";

type DialogCancelButtonProps = ComponentProps<typeof DialogActionButton>;

const DialogCancelButton: FC<DialogCancelButtonProps> = (props) => {
    return (
        <DialogActionButton {...props} color={props.color || "danger"} className={twMerge("mt-2", props.className)}>
            {props.children || "Cancel"}
        </DialogActionButton>
    );
};

export default DialogCancelButton;
