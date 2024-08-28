import SupportForm from "@/features/SupportForm/SupportForm";
import { ServerComponentProps } from "@/types/ServerComponentProps";
import { Spacer } from "@nextui-org/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Support",
    description: "Contact our support team for help.",
};

export default function Page({ searchParams }: ServerComponentProps) {
    const form = searchParams?.form;

    return (
        <main className="flex items-center justify-center py-5 lg:py-10 px-3">
            <div className="md:w-96 lg:w-1/2 xl:w-1/3">
                <h1 className="text-4xl font-bold">Support</h1>
                <p>
                    You can contact our support team by filling out the form
                    below.
                </p>

                <Spacer y={5} />
                <SupportForm form={form} />
            </div>
        </main>
    );
}
