import AntiRaidCard from "@/components/Dashboard/AutoMod/AntiRaidCard";
import Container from "@/components/Dashboard/Container";
import Heading from "@/components/Dashboard/Heading";
import CardGrid from "@/components/Dashboard/Layout/CardGrid";

export default function AutoModPage() {
    return (
        <Container>
            <Heading>Auto Moderation Settings</Heading>

            <CardGrid>
                <AntiRaidCard />
            </CardGrid>
        </Container>
    );
}
