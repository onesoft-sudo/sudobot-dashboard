"use client";

import useIsDesktop from "@/hooks/useIsDesktop";
import { LinearProgress } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { FC, ReactNode } from "react";
import {
    FormState,
    UseFormGetValues,
    UseFormRegister,
    useForm,
} from "react-hook-form";

interface RecoverAccountFormProps {
    onValid?: (data: any) => any;
    step: number;
    currentStep: number;
    isMutating: boolean;
    defaultValues?: Record<string, any>;
    children: (params: {
        register: UseFormRegister<any>;
        formState: FormState<any>;
        getValues: UseFormGetValues<any>;
    }) => ReactNode;
}

const RecoverAccountForm: FC<RecoverAccountFormProps> = ({
    onValid = () => null,
    step,
    currentStep,
    isMutating,
    children,
    defaultValues = {},
}) => {
    const { handleSubmit, formState, register, getValues } = useForm({
        defaultValues,
    });
    const isDesktop = useIsDesktop();

    return (
        <form
            className="mx-2 rounded-lg w-[calc(100vw-20px)] md:min-w-[20vw] md:relative overflow-hidden"
            onSubmit={handleSubmit(onValid)}
            style={{
                background:
                    "linear-gradient(to right, rgba(45, 45, 45, 0.5), rgba(45, 45, 45, 0.6))",
                boxShadow: "0 0 2px 0 rgba(255, 255, 255, 0.6)",
                transform: isDesktop
                    ? `translate(calc(-${(currentStep - 1) * 100}% - (26px * ${
                          currentStep - 1
                      })))`
                    : `translate(calc(-${(currentStep - 1) * 100}vw - ${
                          currentStep - 1 == 0 ? "0px" : "8px"
                      } - ${currentStep > 2 ? (currentStep - 1) * 2 : 0}px))`,
                transition: "0.3s",
            }}
        >
            {isDesktop && (
                <div
                    className="absolute md:static top-0 left-0 w-[100%] h-[100%] md:h-[auto] md:rounded-t-[3px] overflow-hidden z-[1000]"
                    style={{
                        display: isMutating ? "block" : "none",
                    }}
                >
                    <LinearProgress />
                    <AnimatePresence>
                        {isMutating && (
                            <motion.div
                                className="md:absolute top-0 left-0 bg-[rgba(255,255,255,0.2)] h-[100%] w-[100%] z-[1000]"
                                initial={{ opacity: 0.001 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 1 }}
                                transition={{
                                    duration: 0.2,
                                    bounce: 1,
                                }}
                            ></motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}

            <div className="p-4">
                {children({ formState, register, getValues })}
            </div>
        </form>
    );
};

export default RecoverAccountForm;
