"use client";

import { verifyByGoogle } from "@/api/verification/google";
import { logger } from "@/logging/logger";
import { CircularProgress } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, type FC } from "react";
import { MdCheck, MdError } from "react-icons/md";

type GoogleVerificationProps = {
    token: string;
    code: string;
};

const GoogleVerification: FC<GoogleVerificationProps> = ({ code, token }) => {
    const mutation = useMutation({
        mutationFn: () => verifyByGoogle(code, token),
        onSuccess(data) {
            logger.debug(GoogleVerification.name, data);
        },
    });

    useEffect(() => mutation.mutate(), []); // eslint-disable-line react-hooks/exhaustive-deps
    console.log(mutation.error);

    return (
        <div className="flex flex-col items-center justify-center rounded-lg bg-white/70 p-3 shadow-[0_0_2px_0_rgba(0,0,0,0.2)] sm:w-80 md:w-96 dark:shadow-[0_0_2px_0_rgba(255,255,255,0.6)] dark:[background:linear-gradient(to_right,rgba(45,45,45,0.5),rgba(45,45,45,0.6))]">
            {mutation.isPending && <CircularProgress />}
            {mutation.isSuccess && <MdCheck className="text-green-500" size="2.5rem" />}
            {mutation.isError && <MdError className="text-red-500" size="2.5rem" />}
            {mutation.isPending && <p className="mt-3">This may take a moment.</p>}

            {mutation.isSuccess && <p className="mt-3">We&rsquo;ve successfully verified you.</p>}
            {mutation.isError && (
                <p className="mt-3">
                    {mutation.error &&
                    mutation.error instanceof AxiosError &&
                    mutation.error.response?.status === 403 &&
                    mutation.error.response.data.error
                        ? mutation.error.response.data.error
                        : "We were unable to verify you."}
                </p>
            )}
        </div>
    );
};

export default GoogleVerification;
