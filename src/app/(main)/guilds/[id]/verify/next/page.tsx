import { Route } from "@/api/Routes";
import { getAxiosClient } from "@/client/axios";
import VerificationMethods from "@/components/Verification/VerificationMethods";
import { Guild } from "@/types/Guild";
import { VerificationMethod } from "@/types/Verification";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { cache } from "react";

const fetchVerificationInfo = cache(async (id?: string, token?: string) => {
    let response = null;

    if (token && id) {
        try {
            response = await getAxiosClient().post<{
                guild: Guild;
                needs_captcha: boolean;
                supported_methods: VerificationMethod[];
            }>(Route.VERIFICATION_GUILD, {
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
    const { isValid, response } = await fetchVerificationInfo(
        params.id,
        searchParams.token,
    );

    return {
        title:
            isValid && !response?.data.needs_captcha
                ? `Verify to continue to ${response!.data.guild.name}`
                : `Invalid verification token`,
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
    const { isValid, response } = await fetchVerificationInfo(
        params.id,
        searchParams.token,
    );

    if (response?.data.needs_captcha) {
        redirect(
            `/guilds/${encodeURIComponent(params.id)}/verify?state=${encodeURIComponent(searchParams.token)}&utm_medium=web&utm_source=sudobot&utm_campaign=verification`,
        );
    }

    return (
        <div className="flex min-h-[80vh] flex-col items-center justify-center py-10 md:py-20">
            <h1 className="pb-3 text-center text-3xl lg:text-4xl">
                {isValid
                    ? "Choose a verification method"
                    : "Invalid request payload"}
            </h1>
            {isValid && (
                <h3 className="pb-10 text-center text-[#999] md:pb-20 lg:text-lg">
                    to continue to{" "}
                    <strong className="font-semibold text-black dark:text-white">
                        {response?.data?.guild?.name}
                    </strong>
                </h3>
            )}

            <div className="relative mt-5 flex min-h-full w-full items-center justify-center">
                {isValid ? (
                    <VerificationMethods
                        token={searchParams.token}
                        allowedMethods={
                            response?.data?.supported_methods ??
                            (["discord", "google", "github", "email"] as const)
                        }
                    />
                ) : (
                    <p>
                        It looks like you&rsquo;ve come across a page where you
                        shouldn&rsquo;t be! The payload in this URL is invalid.
                    </p>
                )}
            </div>
        </div>
    );
}
