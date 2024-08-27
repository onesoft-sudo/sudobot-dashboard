import HTTPErrorView from "@/components/Errors/HTTPErrorView";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "419 Page Expired",
};

export default function PageExpired() {
    return (
        <HTTPErrorView statusCode={419} statusText="Page Expired">
            The page has either expired due to inactivity or the request payload
            was invalid.
        </HTTPErrorView>
    );
}
