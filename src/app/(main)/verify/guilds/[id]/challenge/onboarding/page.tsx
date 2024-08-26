import { getGuild } from "@/api/discord/guilds";
import PageExpired from "@/app/page-expired";
import GuildVerificationGate from "@/components/GuildVerificationGate/GuildVerificationGate";
import { ServerComponentProps } from "@/types/ServerComponentProps";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

const getGuildCached = cache(getGuild);

// export const metadata: Metadata = {
//     title: "Verify to Continue - SudoBot",
// };

export async function generateMetadata({
    params,
}: ServerComponentProps): Promise<Metadata> {
    const id = params?.id;
    const guild = id ? await getGuildCached(id) : null;

    if (!guild) {
        return {
            title: "404 Not Found - SudoBot",
        };
    }

    return {
        title: "Verify to Continue - SudoBot",
        robots: {
            index: false,
            follow: false,
        },
    };
}

export default async function VerifyOnboardingPage({
    params,
}: ServerComponentProps) {
    const id = params?.id;
    const userId = params?.u;
    const requestToken = params?.t;

    if (!id || !userId || !requestToken) {
        return <PageExpired />;
    }

    const guild = id ? await getGuildCached(id) : null;

    if (!guild) {
        notFound();
    }

    return (
        <div className="mx-5 flex min-h-[90vh] items-center justify-center">
            <GuildVerificationGate
                guild={guild}
                userId={userId}
                requestToken={requestToken}
            />
        </div>
    );
}
