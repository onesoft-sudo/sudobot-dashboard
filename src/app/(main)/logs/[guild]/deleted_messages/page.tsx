import HTTPErrorView from "@/components/Errors/HTTPErrorView";
import { Metadata } from "next";
import { type FC } from "react";

export const generateMetadata = async ({
    params,
    searchParams,
}: {
    params?: Record<string, string>;
    searchParams?: Record<string, string>;
}): Promise<Metadata> => {
    const { guild: guildId } = params || {};
    const { du: dataURL } = searchParams || {};

    if (!guildId || !dataURL) {
        return {
            title: "400 Bad Request",
        };
    }

    return {
        title: "Message Deletion Logs",
        description: "See a detailed log of deleted messages in your server.",
        robots: { index: false, follow: false },
    };
};

const DeletedMessageLogPage: FC<{
    params?: Record<string, string>;
    searchParams?: Record<string, string>;
}> = ({ params, searchParams }) => {
    const { guild: guildId } = params || {};
    const { du: dataURL } = searchParams || {};

    if (!guildId || !dataURL) {
        return (
            <HTTPErrorView statusCode={400} statusText="Bad Request">
                Your request is invalid or missing required parameters.
            </HTTPErrorView>
        );
    }

    return <div>DeletedMessageLogPage</div>;
};

export default DeletedMessageLogPage;
