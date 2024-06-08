"use client";

import { logger } from "@/logging/logger";
import { initiateEmailVerification } from "@/server/verification";
import { Alert } from "@mui/material";
import { Button, Input, Spacer } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { type FC } from "react";
import { MdCheckCircleOutline } from "react-icons/md";

type EmailVerificationProps = {
    token: string;
};

const EmailVerification: FC<EmailVerificationProps> = ({ token }) => {
    const mutation = useMutation({
        mutationFn: async (data: FormData) => {
            const response = await initiateEmailVerification(token, data.get("email") as string);

            if (response.error) {
                return Promise.reject(new Error(response.error));
            }

            return response.data;
        },
        onSuccess(data) {
            logger.debug(EmailVerification.name, data);
        },
    });

    const onSubmit = async (data: FormData) => {
        console.log(data);
        mutation.mutate(data);
    };

    return (
        <form
            action={onSubmit}
            className="rounded-lg bg-white/70 p-3 text-left shadow-[0_0_2px_0_rgba(0,0,0,0.2)] sm:w-80 md:w-96 dark:shadow-[0_0_2px_0_rgba(255,255,255,0.6)] dark:[background:linear-gradient(to_right,rgba(45,45,45,0.5),rgba(45,45,45,0.6))]"
        >
            {mutation.isError && (
                <Alert severity="error" title="Error" className="mb-3">
                    {mutation.error?.message}
                </Alert>
            )}
            {mutation.isSuccess ? (
                <div className="flex flex-col items-center justify-center gap-3">
                    <MdCheckCircleOutline className="text-green-500" size="3rem" />
                    <p className="text-center text-lg font-semibold">Email Delivered</p>
                    <p className="text-center text-sm text-gray-500">
                        Check your email inbox for further instructions.
                    </p>
                    <p className="text-center text-sm text-gray-500">
                        If you don&rsquo;t see the email, check other places it might be, like your junk, spam, social,
                        or other folders.
                    </p>
                </div>
            ) : (
                <>
                    <Input
                        isDisabled={mutation.isPending}
                        label="Email"
                        placeholder="Type your email address"
                        type="email"
                        name="email"
                    />
                    <Spacer y={2} />
                    <Button variant="flat" type="submit" isLoading={mutation.isPending} fullWidth>
                        Submit
                    </Button>
                </>
            )}
        </form>
    );
};

export default EmailVerification;
