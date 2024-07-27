import HTTPErrorView from "@/components/Errors/HTTPErrorView";
import { type FC } from "react";

const DeletedMessageLogPage: FC<{ params?: Record<string, string>; searchParams?: Record<string, string> }> = ({
    params,
    searchParams,
}) => {
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
