import ChartJSInitializer from "@/components/Charts/ChartJSInitializer";
import Container from "@/components/Dashboard/Container";
import CardGrid from "@/components/Dashboard/Layout/CardGrid";
import AnnouncementCard from "@/components/Dashboard/Overview/AnnouncementCard";
import GuildListCard from "@/components/Dashboard/Overview/GuildListCard";
import InfractionStatisticsCard from "@/components/Dashboard/Overview/InfractionStatisticsCard";
import WelcomeHeading from "@/components/Dashboard/WelcomeHeading";

export default function Dashboard() {
    return (
        <Container>
            <WelcomeHeading />
            <ChartJSInitializer />

            <CardGrid>
                <AnnouncementCard />
                <InfractionStatisticsCard />
                <GuildListCard />
            </CardGrid>
        </Container>
    );
}
