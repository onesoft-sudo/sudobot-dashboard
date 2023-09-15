"use client";

import useIsDesktop from "@/hooks/useIsDesktop";
import { API } from "@/utils/api";
import { wait } from "@/utils/utils";
import { Button, LinearProgress, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useState } from "react";
import { MdError } from "react-icons/md";
import RecoverAccountForm from "./RecoverAccountForm";

const RecoverAccount: FC = () => {
    const [step, setStep] = useState(1);
    const stepOneMutation = useMutation({
        mutationFn: variables => axios.post(API.recovery(), variables),
    });
    const stepTwoMutation = useMutation({
        mutationFn: variables => axios.post(API.recoveryToken(), variables),
    });
    const stepThreeMutation = useMutation({
        mutationFn: variables => wait(5000), // axios.post(API.recoveryToken(), variables)
    });
    const isMutating =
        stepOneMutation.isLoading ||
        stepTwoMutation.isLoading ||
        stepThreeMutation.isLoading;
    const isDesktop = useIsDesktop();

    const onValid = async (data: any) => {
        if (step === 1) {
            if (!stepOneMutation.isSuccess) {
                await stepOneMutation.mutateAsync(data);
            }
        } else if (step === 2) {
            await stepTwoMutation.mutateAsync({
                username: (stepOneMutation.variables as any)?.username,
                ...data,
            });
        } else if (step === 3) {
            await stepThreeMutation.mutateAsync();
            return;
        } else {
            return;
        }

        setStep(step => step + 1);
    };

    return (
        <>
            {!isDesktop && (
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
            <div className="h-[70vh] md:h-[auto]">
                <div className="absolute left-0 md:relative !overflow-x-hidden !max-w-[100vw]">
                    <div
                        className={`mr-2 ${
                            step === 1 ? "ml-[3px] md:ml-3" : "ml-2"
                        } my-3 flex items-center justify-start left-0 gap-[10px] w-[300vw] md:min-w-[20vw] md:w-[21vw] md:max-w-[25vw] md:relative md:overflow-x-hidden`}
                    >
                        <RecoverAccountForm
                            currentStep={step}
                            step={1}
                            isMutating={isMutating}
                            onValid={onValid}
                        >
                            {({ register, formState: { errors } }) => (
                                <>
                                    <h2 className="text-xl md:text-2xl text-center pb-[50px]">
                                        Enter your username
                                    </h2>
                                    <TextField
                                        label="Username"
                                        fullWidth
                                        {...register("username", {
                                            required:
                                                "You must specify your username!",
                                        })}
                                        color={
                                            errors.username?.message
                                                ? "error"
                                                : "primary"
                                        }
                                    />
                                    {errors.username?.message && (
                                        <p className="text-xs text-red-500 pt-1 flex items-center gap-1">
                                            <MdError size={"1.2em"} />{" "}
                                            {errors.username?.message.toString()}
                                        </p>
                                    )}

                                    <div className="pt-3 flex justify-end">
                                        <Button type="submit">Next</Button>
                                    </div>
                                </>
                            )}
                        </RecoverAccountForm>

                        <RecoverAccountForm
                            currentStep={step}
                            step={2}
                            isMutating={isMutating}
                            onValid={onValid}
                        >
                            {({ register, formState: { errors } }) => (
                                <>
                                    <h2 className="text-xl md:text-2xl text-center pb-[20px]">
                                        Enter verification code
                                    </h2>
                                    <p className="text-[#999] pb-[25px]">
                                        If &ldquo;
                                        {
                                            (stepOneMutation.variables as any)
                                                ?.username
                                        }
                                        &rdquo; is your SudoBot Account
                                        username, we&rsquo;ll send you a direct
                                        message in your Discord Account with the
                                        verification code.
                                    </p>
                                    <TextField
                                        label="Verification Code"
                                        fullWidth
                                        type="number"
                                        {...register("code", {
                                            required:
                                                "You must specify the verification code!",
                                            valueAsNumber: true,
                                        })}
                                        color={
                                            errors.code?.message
                                                ? "error"
                                                : "primary"
                                        }
                                    />
                                    {errors.code?.message && (
                                        <p className="text-xs text-red-500 pt-1 flex items-center gap-1">
                                            <MdError size={"1.2em"} />{" "}
                                            {errors.code?.message.toString()}
                                        </p>
                                    )}

                                    <div className="pt-3 flex justify-end">
                                        {/* <Button
                                        type="button"
                                        onClick={() => {
                                            setStep(step => step - 1);
                                        }}
                                    >
                                        Back
                                    </Button> */}
                                        <Button type="submit">Next</Button>
                                    </div>
                                </>
                            )}
                        </RecoverAccountForm>

                        <RecoverAccountForm
                            currentStep={step}
                            step={3}
                            isMutating={isMutating}
                            onValid={onValid}
                        >
                            {({ register, formState: { errors } }) => (
                                <>
                                    <h2 className="text-xl md:text-2xl text-center pb-[20px]">
                                        Enter new password
                                    </h2>
                                    <TextField label="New password" fullWidth />
                                    <div className="pt-3 flex justify-end">
                                        {/* <Button
                                        type="button"
                                        onClick={() => {
                                            setStep(step => step - 1);
                                        }}
                                    >
                                        Back
                                    </Button> */}
                                        <Button type="submit">Next</Button>
                                    </div>
                                </>
                            )}
                        </RecoverAccountForm>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RecoverAccount;
