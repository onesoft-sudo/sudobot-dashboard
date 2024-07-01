"use client";

import { DialogContext } from "@/contexts/DialogContext";
import { useTheme } from "@/hooks/theme";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import DialogActionButton from "./DialogActionButton";
import DialogBody from "./DialogBody";
import DialogCancelButton from "./DialogCancelButton";
import DialogControls from "./DialogControls";
import DialogDescription from "./DialogDescription";
import DialogIcon from "./DialogIcon";
import DialogPrimaryActionButton from "./DialogPrimaryActionButton";
import DialogTitle from "./DialogTitle";

type DialogProps = {
    isOpen: boolean;
    onClose?: () => void;
    children: React.ReactNode;
};

function Dialog({ isOpen, onClose, children }: DialogProps) {
    const { mode } = useTheme();

    useEffect(() => {
        const previousOverflow = document.body.style.overflow;
        const previousHeight = document.body.style.height;
        const previousPaddingRight = document.body.style.paddingRight;

        if (isOpen) {
            document.body.style.overflow = "hidden";
            document.body.style.height = "100vh";
            document.body.style.paddingRight = "0.5rem";
        }

        return () => {
            document.body.style.overflow = previousOverflow;
            document.body.style.height = previousHeight;
            document.body.style.paddingRight = previousPaddingRight;
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose?.();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    return (
        <DialogContext.Provider value={{ onClose }}>
            <AnimatePresence initial={false} onExitComplete={() => void onClose?.()}>
                {isOpen && (
                    <motion.div
                        key="backdrop"
                        initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
                        animate={{ backgroundColor: mode === "dark" ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.5)" }}
                        exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
                        transition={{ duration: 0.2 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose?.();
                        }}
                        className="fixed left-0 top-0 z-[100000000000000] flex h-screen w-screen items-center justify-center"
                    >
                        <motion.div
                            key="dialog"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className="mx-10 w-full rounded-lg bg-white/70 p-5 shadow outline-none backdrop-blur-md [box-shadow:0_10px_30px_10px_rgba(0,0,0,0.3)] dark:bg-[rgba(35,35,35,0.2)] md:w-80"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {children}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </DialogContext.Provider>
    );
}

Dialog.Title = DialogTitle;
Dialog.Body = DialogBody;
Dialog.Description = DialogDescription;
Dialog.Icon = DialogIcon;
Dialog.Controls = DialogControls;
Dialog.CancelButton = DialogCancelButton;
Dialog.ActionButton = DialogActionButton;
Dialog.PrimaryActionButton = DialogPrimaryActionButton;

export default Dialog;
