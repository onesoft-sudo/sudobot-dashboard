import { Metadata } from "next";
import { DONATION_URL } from "@/config/links";
import Link from "@/components/Navigation/Link";

export const metadata: Metadata = {
    title: "Donate - SudoBot"
};

export default function NotFound() {
    return (
	<div className="flex min-h-[80svh] items-center justify-center">
            <main className="mx-auto my-5 w-96 text-center lg:my-10">
                <h1 className="text-3xl lg:text-4xl">
                    <span className="text-blue-500">Redirecting...</span>
                </h1>
                <Redirect to={DONATION_URL} />
                <p className="mt-2 text-[#999]">You&rsquo;ll be redirected to the donation page shortly.</p>
                <hr className="my-3 border-t-1 border-t-gray-200 dark:border-t-gray-700" />
                <p className="text-[#999]">
                    If you're not being redirected in 5 seconds, you can{" "}
                    <Link href={DONATION_URL} className="link">
                        manually navigate
                    </Link>
                    to the page.
                </p>
            </main>
        </div>
    );
}
