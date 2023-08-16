import { getAnnouncements } from "@/api/announcements";
import DashboardCards from "@/components/Dashboard/DashboardCards";
import Welcome from "@/components/Dashboard/Welcome";
import { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
    title: "Dashboard - SudoBot",
};

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
