"use client";

import useIsDesktop from "@/hooks/useIsDesktop";
import { API } from "@/utils/api";
import { Button, LinearProgress, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FC, useState } from "react";
import { HiShieldCheck } from "react-icons/hi2";
import { MdError } from "react-icons/md";
import FormLoading from "./FormLoading";
import RecoverAccountForm from "./RecoverAccountForm";

// TODO: Error handling
const RecoverAccount: FC = () => {
    const [step, setStep] = useState(1);
    const stepOneMutation = useMutation({
        mutationFn: variables => axios.post(API.recovery(), variables),
    });
    const stepTwoMutation = useMutation({
        mutationFn: variables => axios.post(API.recoveryToken(), variables),
    });
    const stepThreeMutation = useMutation({
        mutationFn: variables => axios.post(API.reset(), variables),
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
            const response = await stepTwoMutation.mutateAsync({
                username: (stepOneMutation.variables as any)?.username,
                ...data,
            });

            console.log(response);
        } else if (step === 3) {
            await stepThreeMutation.mutateAsync({
                username: (stepOneMutation.variables as any)?.username,
                token: stepTwoMutation.data?.data?.token,
                ...data,
            });
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
                    <FormLoading isLoading={isMutating} />
                </div>
            )}
            <div className="h-[70vh] md:h-[auto]">
                <div className="absolute left-0 md:relative !overflow-x-hidden !max-w-[100vw]">
                    <div
                        className={`mr-2 ${
                            step === 1
                                ? "ml-[3px] md:ml-3"
                                : step === 4
                                ? "ml-2.5 md:ml-2"
                                : "ml-2"
                        } my-3 flex items-center justify-start left-0 gap-[10px] w-[400vw] md:min-w-[20vw] md:w-[21vw] md:max-w-[25vw] md:relative md:overflow-x-hidden`}
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
                            {({
                                register,
                                formState: { errors },
                                getValues,
                            }) => (
                                <>
                                    <h2 className="text-xl md:text-2xl text-center pb-[20px]">
                                        Enter new password
                                    </h2>

                                    <TextField
                                        label="New Password"
                                        type="password"
                                        fullWidth
                                        {...register("new_password", {
                                            required:
                                                "You must specify the new password to set!",
                                        })}
                                        color={
                                            errors.new_password?.message
                                                ? "error"
                                                : "primary"
                                        }
                                    />
                                    {errors.new_password?.message && (
                                        <p className="text-xs text-red-500 pt-1 flex items-center gap-1">
                                            <MdError size={"1.2em"} />{" "}
                                            {errors.new_password?.message.toString()}
                                        </p>
                                    )}

                                    <div className="pt-4"></div>

                                    <TextField
                                        label="Confirm New Password"
                                        type="password"
                                        fullWidth
                                        {...register("new_password_confirm", {
                                            required:
                                                "You must confirm the new password!",
                                            validate: value =>
                                                getValues().new_password ===
                                                value
                                                    ? undefined
                                                    : "Passwords do not match!",
                                        })}
                                        color={
                                            errors.new_password_confirm?.message
                                                ? "error"
                                                : "primary"
                                        }
                                    />
                                    {errors.new_password_confirm?.message && (
                                        <p className="text-xs text-red-500 pt-1 flex items-center gap-1">
                                            <MdError size={"1.2em"} />{" "}
                                            {errors.new_password_confirm?.message.toString()}
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
                            step={4}
                            isMutating={isMutating}
                            onValid={onValid}
                        >
                            {({ register, formState: { errors } }) => (
                                <>
                                    <h2 className="text-xl md:text-2xl text-center pb-[20px] flex items-center justify-center gap-2">
                                        <HiShieldCheck
                                            className="text-green-500"
                                            size={30}
                                        />{" "}
                                        <span>Success</span>
                                    </h2>

                                    <p className="text-[#999]">
                                        We&rsquo;ve updated your account&rsquo;s
                                        password.
                                    </p>

                                    <div className="pt-3 flex justify-end">
                                        <Button type="button" href="/login">
                                            Finish
                                        </Button>
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
