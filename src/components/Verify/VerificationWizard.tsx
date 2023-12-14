"use client";

import { VerificationInfo } from "@/api/routes/verify";
import useVerificationContext from "@/hooks/useVerificationContext";
import VerificationGuild from "./VerificationGuild";
import VerificationSteps from "./VerificationSteps";

interface VerificationWizardProps {
    info: { iconURL?: string | null } & VerificationInfo;
}

const steps = ["Choose a verification method", "Verify", "Complete"];

export default function VerificationWizard({
    info: { guildId, guildName, iconURL },
}: VerificationWizardProps) {
    const { step } = useVerificationContext();

    return (
        <div>
            <h1 className="text-3xl md:text-4xl text-center pt-5 md:pt-0 max-w-[95vw] whitespace-break-spaces">
                {steps[step > 1 ? 1 : step]}
            </h1>
            <div className="text-center text-[#999] mt-3 flex items-center justify-center pt-3 pb-[20px] md:pb-[50px]">
                <p className="inline-block">to continue to</p>
                <VerificationGuild
                    guildId={guildId}
                    guildName={guildName}
                    iconURL={iconURL}
                />
            </div>

            <div className="flex justify-center items-center">
                <VerificationSteps />
            </div>
        </div>
    );
}
