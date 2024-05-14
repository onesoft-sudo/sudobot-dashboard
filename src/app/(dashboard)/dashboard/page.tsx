import ChartJSInitializer from "@/components/Charts/ChartJSInitializer";
import CardGrid from "@/components/Dashboard/CardGrid";
import Container from "@/components/Dashboard/Container";
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
