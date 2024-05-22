"use client";

import OTPInput from "@/components/Form/OTPInput";
import { CircularProgress } from "@mui/material";
import { useCallback, useState } from "react";
import { MdError } from "react-icons/md";

export default function OTPVerifier() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const onDone = useCallback((code: string) => {
        setStatus("loading");

        setTimeout(() => {
            if (code === "123456") {
                setStatus("success");
            } else {
                setStatus("error");
            }
        }, 5000);
    }, []);

    return (
        <div>
            <OTPInput digits={6} onDone={onDone} autoFocus disabled={status === "loading"} />
            {status === "loading" && (
                <div className="flex items-center justify-center gap-2 pt-3">
                    <CircularProgress size="1.5rem" /> Verifying...
                </div>
            )}
            {status === "error" && (
                <div className="flex items-center justify-center gap-2 pt-2 text-center text-sm text-red-500">
                    <MdError /> Invalid code. Please try again.
                </div>
            )}
        </div>
    );
}
