import { Metadata } from "next";
import { headers } from "next/headers";
import { FC } from "react";
import NotFoundInner from "./not-found-inner";

export const metadata: Metadata = {
    title: "404 Not Found - SudoBot",
    description: "Whoops! Could not find the page you were looking for.",
};

const NotFoundPage: FC = () => {
    return <NotFoundInner path={headers().get("x-invoke-path") ?? "/"} />;
};

export default NotFoundPage;
