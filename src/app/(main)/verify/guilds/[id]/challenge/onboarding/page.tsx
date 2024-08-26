import PageExpired from "@/app/page-expired";
import GuildVerificationGate from "@/components/GuildVerificationGate/GuildVerificationGate";
import { ServerComponentProps } from "@/types/ServerComponentProps";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

const getGuildCached = cache(async (id: string) => {
    return [{ id: "01", name: "Test Server", icon: null }, null] as const;

    // try {
    //     const guild = await getGuild(id);
    //     return [
    //         guild,
    //         guild === null ? new Error("404 Not Found") : null,
    //     ] as const;
    // } catch (error) {
    //     return [null, error] as const;
    // }
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

    const [guild, error] = id ? await getGuildCached(id) : [null, true];

    if (!guild || error) {
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
    searchParams,
}: ServerComponentProps) {
    const id = params?.id;
    const userId = searchParams?.u;
    const requestToken = searchParams?.t;

    if (!id || !userId || !requestToken) {
        return <PageExpired />;
    }

    const [guild, error] = id ? await getGuildCached(id) : [null, true];

    if (!guild || error) {
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
