import EmailVerification from "@/components/Verification/EmailVerification";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Verify with Email Address - SudoBot",
    robots: {
        index: false,
        follow: false,
    },
};

export default function Page({ searchParams }: { searchParams: Record<string, string> }) {
    const { state: token } = searchParams;

    if (!token) {
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
                <EmailVerification token={token} />
            </div>
        </div>
    );
}
