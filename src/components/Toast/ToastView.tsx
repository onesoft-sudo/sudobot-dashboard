"use client";

import { logger } from "@/logging/logger";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/AppStoreHooks";
import { removeToast, removeToasts } from "@/redux/slice/ToastManagerSlice";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Toast from "./Toast";

type ToastViewProps = {
    maxToasts?: number;
};

export default function ToastView({ maxToasts = 3 }: ToastViewProps) {
    const toasts = useAppSelector((state) => state.toastManager.toasts);
    const dispatch = useAppDispatch();
    const timeoutRef = useRef<Record<string, ReturnType<typeof setTimeout> | undefined>>({});

    useEffect(() => {
        const toastsToRemove =
            toasts.length > maxToasts
                ? toasts.slice(0, Math.max(0, toasts.length - maxToasts)).map((toast) => toast.id)
                : [];

        toastsToRemove.forEach((id) => {
            if (timeoutRef.current[id]) {
                clearTimeout(timeoutRef.current[id]!);
                timeoutRef.current[id] = undefined;
            }
        });

        toasts.forEach((toast) => {
            if (toast.closeIn && !toastsToRemove.includes(toast.id)) {
                if (timeoutRef.current[toast.id]) {
                    return;
                }

                timeoutRef.current[toast.id] = setTimeout(() => {
                    dispatch(removeToast(toast.id));
                    timeoutRef.current[toast.id] = undefined;
                }, toast.closeIn);
            }
        });

        if (toasts.length > maxToasts) {
            dispatch(removeToasts(toastsToRemove));
        }
    }, [toasts, dispatch, maxToasts]);

    logger.debug("ToastView", "Toast array length: ", toasts.length);

    return (
        <div className="fixed bottom-1 z-[1000000] w-full overflow-y-hidden px-5 py-3 [transition:1s_ease] lg:w-[32rem]">
            <div className="flex flex-col gap-5">
                <AnimatePresence>
                    {toasts.slice(Math.max(toasts.length - maxToasts, 0)).map((toast) => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            transition={{ duration: 0.25 }}
                            layout
                        >
                            <Toast
                                details={toast}
                                onClose={() => {
                                    if (timeoutRef.current[toast.id]) {
                                        clearTimeout(timeoutRef.current[toast.id]!);
                                        timeoutRef.current[toast.id] = undefined;
                                    }

                                    dispatch(removeToast(toast.id));
                                }}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
