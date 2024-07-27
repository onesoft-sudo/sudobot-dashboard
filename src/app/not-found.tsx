import HTTPErrorView from "@/components/Errors/HTTPErrorView";
import MainLayout from "@/layouts/MainLayout";

export default function NotFound() {
    return (
        <MainLayout>
            <HTTPErrorView statusCode={404} statusText="Not Found">
                The requested URL was not found on this server.
            </HTTPErrorView>
        </MainLayout>
    );
}
