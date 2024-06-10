import FinishEmailVerification from "@/components/Verification/FinishEmailVerification";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Complete Email Address Verification - SudoBot",
    robots: {
        index: false,
        follow: false,
    },
};

export default function Page({ searchParams }: { searchParams: Record<string, string> }) {
    const { eml_token: emailToken, state: token, addr: email } = searchParams;

    if (!emailToken || !token || !email) {
        return (
            <div className="flex min-h-[80vh] flex-col items-center justify-center py-10 md:py-20">
                <h1 className="pb-3 text-center text-3xl lg:text-4xl">Invalid request payload</h1>
                <div className="relative mt-5 flex min-h-full w-full items-center justify-center">
                    <p>
                        It looks like you&rsquo;ve come across a page where you shouldn&rsquo;t be! The paylod in this
                        URL is invalid.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-[80vh] flex-col items-center justify-center py-10 md:py-20">
            <h1 className="pb-3 text-center text-3xl lg:text-4xl">Verify with Email Address</h1>

            <div className="relative mt-5 flex min-h-full w-full flex-col items-center justify-center text-center">
                <FinishEmailVerification token={token} emailToken={emailToken} email={email} />
            </div>
        </div>
    );
}
