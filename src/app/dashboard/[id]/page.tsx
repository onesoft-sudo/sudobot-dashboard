import { getAnnouncements } from "@/api/announcements";
import DashboardCards from "@/components/Dashboard/DashboardCards";
import Welcome from "@/components/Dashboard/Welcome";
import { FC } from "react";

const Dashboard: FC = async () => {
    let announcements = [];

    try {
        const response = await getAnnouncements();
        announcements = response.data?.announcements;
    } catch (e) {}

    return (
        <main className="min-h-[90vh]">
            <Welcome />

            <br />
            <br />

            <DashboardCards announcements={announcements} />
        </main>
    );
};

export default Dashboard;
