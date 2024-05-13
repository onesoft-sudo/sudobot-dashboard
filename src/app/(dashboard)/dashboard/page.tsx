import ChartJSInitializer from "@/components/Charts/ChartJSInitializer";
import AnnouncementCard from "@/components/Dashboard/Overview/AnnouncementCard";
import GuildListCard from "@/components/Dashboard/Overview/GuildListCard";
import InfractionStatisticsCard from "@/components/Dashboard/Overview/InfractionStatisticsCard";
import WelcomeHeading from "@/components/Dashboard/WelcomeHeading";

export default function Dashboard() {
    return (
        <div className="px-3 py-4 lg:pl-1 lg:pr-4">
            <WelcomeHeading />
            <ChartJSInitializer />

            <div className="mt-7 grid grid-cols-1 gap-5 md:mt-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <AnnouncementCard />
                <InfractionStatisticsCard />
                <GuildListCard />
            </div>
        </div>
    );
}
