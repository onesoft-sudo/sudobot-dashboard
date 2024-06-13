"use client";

import { VerificationMethod } from "@/types/Verification";
import { Box } from "@mui/material";
import { MdArrowForwardIos } from "react-icons/md";
import Link from "../Navigation/Link";

const methods = [
    {
        name: "Discord",
        description: "Verify with your Discord account",
        id: "discord" satisfies VerificationMethod,
        href: process.env.NEXT_PUBLIC_DISCORD_OAUTH_URL,
    },
    {
        name: "Google",
        description: "Verify with your Google account",
        id: "google" satisfies VerificationMethod,
        href: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_URL,
    },
    {
        name: "GitHub",
        description: "Verify with your GitHub account",
        id: "github" satisfies VerificationMethod,
        href: process.env.NEXT_PUBLIC_GITHUB_OAUTH_URL,
    },
    {
        name: "Email",
        description: "Verify with your Email address",
        id: "email" satisfies VerificationMethod,
        href: "/challenge/email?access_type=online&utm_source=website&utm_medium=button&utm_campaign=verify_email&scope=email",
    },
] as const;

export default function VerificationMethods({
    token,
    allowedMethods,
}: {
    token: string;
    allowedMethods: VerificationMethod[];
}) {
    return (
        <Box className="flex flex-col gap-3 sm:w-80 md:w-96">
            {methods.map((method) =>
                allowedMethods.includes(method.id) ? (
                    <Box
                        component={"href" in method ? Link : "div"}
                        key={method.id}
                        href={"href" in method ? `${method.href}&state=${encodeURIComponent(token)}` : undefined}
                        className="flex cursor-pointer items-center justify-between rounded-lg bg-white/70 p-3 shadow-[0_0_2px_0_rgba(0,0,0,0.2)] hover:bg-white/30 dark:shadow-[0_0_2px_0_rgba(255,255,255,0.6)] dark:[background:linear-gradient(to_right,rgba(45,45,45,0.5),rgba(45,45,45,0.6))] hover:dark:[background:rgba(45,45,45,0.7)]"
                    >
                        <div>
                            <h3 className="text-lg font-semibold">{method.name}</h3>
                            <p className="text-[#999]">{method.description}</p>
                        </div>
                        <div>
                            <MdArrowForwardIos className="text-[#999] hover:text-black dark:hover:text-white" />
                        </div>
                    </Box>
                ) : null,
            )}
        </Box>
    );
}
