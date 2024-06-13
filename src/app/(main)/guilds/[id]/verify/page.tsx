import { Route } from "@/api/Routes";
import { getAxiosClient } from "@/client/axios";
import VerificationInitiator from "@/components/Verification/VerificationInitiator";
import { Guild } from "@/types/Guild";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { cache } from "react";

const fetchVerificationInfo = cache(async (id?: string, token?: string) => {
    let response = null;

    if (token && id) {
        try {
            response = await getAxiosClient().post<{ guild: Guild; needs_captcha: boolean }>(Route.VERIFICATION_GUILD, {
                token,
            });
        } catch (error) {
            console.error(error);
        }
    }

    const isValid = token && response?.data?.guild && response.status === 200;
    return { response, isValid };
});

export const generateMetadata = async ({
    searchParams,
    params,
}: {
    searchParams: Record<string, string>;
    params: Record<string, string>;
}): Promise<Metadata> => {
    const { isValid, response } = await fetchVerificationInfo(params.id, searchParams.token);

    return {
        title: isValid
            ? `Verify to continue to ${response!.data.guild.name} - SudoBot`
            : `Invalid verification token - SudoBot`,
        robots: {
            index: false,
            follow: false,
        },
    };
};

export default async function Page({
    searchParams,
    params,
}: {
    searchParams: Record<string, string>;
    params: Record<string, string>;
}) {
    const { isValid, response } = await fetchVerificationInfo(params.id, searchParams.token);

    console.log(response?.data);

    if (isValid && !response?.data.needs_captcha) {
        redirect(
            `/guilds/${encodeURIComponent(params.id)}/verify/next?token=${encodeURIComponent(searchParams.token)}&utm_medium=web&utm_source=sudobot&utm_campaign=verification`,
        );
    }

    return (
        <div className="flex min-h-[80vh] flex-col items-center justify-center py-10 md:py-20">
            {!isValid ? (
                <>
                    {" "}
                    <h1 className="pb-3 text-center text-3xl lg:text-4xl">Invalid request payload</h1>
                    <div className="relative mt-5 flex min-h-full w-full items-center justify-center">
                        <p>
                            It looks like you&rsquo;ve come across a page where you shouldn&rsquo;t be! The payload in
                            this URL is invalid.
                        </p>
                    </div>
                </>
            ) : (
                <>
                    <h1 className="pb-3 text-center text-3xl lg:text-4xl">Verify</h1>
                    <h3 className="pb-10 text-center text-[#999] md:pb-20 lg:text-lg">
                        to continue to{" "}
                        <strong className="font-semibold text-black dark:text-white">
                            {response?.data?.guild?.name}
                        </strong>
                    </h3>

                    <VerificationInitiator token={searchParams.token} guildId={params.id} />
                </>
            )}
        </div>
    );
}
