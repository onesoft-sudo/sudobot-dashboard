import { getAnnouncements } from "@/api/announcements";
import DashboardCards from "@/components/Dashboard/DashboardCards";
import { FC } from "react";

const Dashboard: FC = async () => {
    let announcements = [];

    try {
        const response = await getAnnouncements();
        announcements = response.data?.announcements;
    } catch (e) {}

    return (
        <main className="min-h-[90vh]">
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-center pt-7">
                Welcome to The Control Panel,{" "}
                <span className="text-blue-600">rakinar2</span>!
            </h1>

            <br />
            <br />

            <DashboardCards announcements={announcements} />
        </main>
    );
};

export default Dashboard;
