import Link from "@/components/Navigation/Link";
import MainLayout from "@/layouts/MainLayout";

export default function NotFound() {
    return (
        <MainLayout>
            <div className="flex min-h-[80svh] items-center justify-center">
                <main className="mx-auto my-5 w-96 text-center lg:my-10">
                    <h1 className="text-3xl lg:text-4xl">
                        <span className="text-red-400">404</span> Not Found
                    </h1>
                    <p className="mt-2 text-[#999]">The requested URL was not found on this server.</p>
                    <hr className="my-3 border-t-1 border-t-gray-200 dark:border-t-gray-700" />
                    <p className="text-[#999]">
                        You can go back to the{" "}
                        <Link href="/" className="link">
                            homepage
                        </Link>
                        .
                    </p>
                </main>
            </div>
        </MainLayout>
    );
}
