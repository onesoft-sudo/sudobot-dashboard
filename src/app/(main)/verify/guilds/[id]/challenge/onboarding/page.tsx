import PageExpired from "@/app/page-expired";
import GuildVerificationGate from "@/components/GuildVerificationGate/GuildVerificationGate";
import { Guild } from "@/types/Guild";
import { ServerComponentProps } from "@/types/ServerComponentProps";
import axios from "axios";
import { Metadata } from "next";
import { cache } from "react";

const getVerificationInfo = cache(async (guildId: string, memberId: string) => {
    try {
        const info = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/guilds/${encodeURIComponent(guildId)}/members/${encodeURIComponent(memberId)}/verify`,
        );
        return [info.data?.guild as Guild, null] as const;
    } catch (error) {
        return [null, error] as const;
    }
});

export async function generateMetadata({
    params,
    searchParams,
}: ServerComponentProps): Promise<Metadata> {
    const id = params?.id;
    const userId = searchParams?.u;
    const requestToken = searchParams?.t;

    if (!id || !userId || !requestToken) {
        return {
            title: "419 Page Expired - SudoBot",
        };
    }

    const [guild, error] = id
        ? await getVerificationInfo(id, userId)
        : [null, true];

    if (!guild || error) {
        return {
            title: "419 Page Expired - SudoBot",
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
    searchParams,
}: ServerComponentProps) {
    const id = params?.id;
    const userId = searchParams?.u;
    const requestToken = searchParams?.t;

    if (!id || !userId || !requestToken) {
        return <PageExpired />;
    }

    const [guild, error] = id
        ? await getVerificationInfo(id, userId)
        : [null, true];

    if (!guild || error) {
        return <PageExpired />;
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
