import HTTPErrorView from "@/components/Errors/HTTPErrorView";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "404 Not Found",
};

export default function NotFound() {
    return (
        <HTTPErrorView statusCode={404} statusText="Not Found">
            The requested URL was not found on this server.
        </HTTPErrorView>
    );
}
