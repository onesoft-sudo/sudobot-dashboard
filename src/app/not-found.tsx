import { Metadata } from "next";
import { headers } from "next/headers";
import { FC } from "react";
import { MdError } from "react-icons/md";
import NotFoundButtons from "./not-found-buttons";

export const metadata: Metadata = {
    title: "404 Not Found - SudoBot",
    description: "Whoops! Could not find the page you were looking for.",
};

const NotFoundPage: FC = () => {
    return (
        <main className="py-10 px-2 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-red-500 flex justify-center items-center gap-4">
                <MdError className="text-[1.2em] -mt-1" />
                404 Not Found
            </h1>
            <br />
            <h3 className="text-xl md:text-2xl lg:text-3xl">Page Not Found</h3>
            <br />
            <p>
                The requested URL{" "}
                <span className="font-mono text-blue-500">
                    {headers().get("x-invoke-path")}
                </span>{" "}
                was not found on this server. Are you sure you&rsquo;re
                accessing the right URL?
                <br />
                If you think this should not happen, please contact the
                webmaster at{" "}
                <a className="link" href="mailto:webmaster@sudobot.org">
                    webmaster@sudobot.org
                </a>
                .
            </p>
            <br />
            <NotFoundButtons />
        </main>
    );
};

export default NotFoundPage;
