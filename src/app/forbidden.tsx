"use client";

import { Metadata } from "next";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { MdError } from "react-icons/md";
import ErrorButtons from "./error-buttons";

export const metadata: Metadata = {
    title: "403 Forbidden - SudoBot",
    description: "Whoops! Looks like you've come into a wrong page.",
};

const ForbiddenPage: FC = () => {
    const pathname = usePathname();

    return (
        <main className="py-10 px-2 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-red-500 flex justify-center items-center gap-4">
                <MdError className="text-[1.2em] -mt-1" />
                403 Forbidden
            </h1>
            <br />
            <h3 className="text-xl md:text-2xl lg:text-3xl">Access Denied</h3>
            <br />
            <p>
                You don&rsquo;t have permission to access{" "}
                <span className="font-mono text-blue-500">{pathname} </span> on
                this server. Are you sure you&rsquo;re accessing the right URL?
                <br />
                If you think this should not happen, please contact the
                webmaster at{" "}
                <a className="link" href="mailto:webmaster@sudobot.org">
                    webmaster@sudobot.org
                </a>
                .
            </p>
            <br />
            <ErrorButtons />
        </main>
    );
};

export default ForbiddenPage;
