import LoginWithDiscord from "@/components/Login/LoginWithDiscord";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login with Discord",
    robots: {
        index: false,
        follow: false,
    },
};

export default function Page({
    searchParams,
}: {
    searchParams: Record<string, string>;
}) {
    const { code } = searchParams;

    if (!code) {
        return (
            <div className="flex min-h-[80vh] flex-col items-center justify-center py-10 md:py-20">
                <h1 className="pb-3 text-center text-3xl lg:text-4xl">
                    Invalid request payload
                </h1>
                <div className="relative mt-5 flex min-h-full w-full items-center justify-center">
                    <p>
                        It looks like you&rsquo;ve come across a page where you
                        shouldn&rsquo;t be! The paylod in this URL is invalid.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-[80vh] flex-col items-center justify-center py-10 md:py-20">
            <h1 className="pb-3 text-center text-3xl lg:text-4xl">
                Login with Discord
            </h1>

            <div className="relative mt-5 flex min-h-full w-full flex-col items-center justify-center text-center">
                <LoginWithDiscord code={code} />
            </div>
        </div>
    );
}
