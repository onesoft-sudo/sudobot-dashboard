import RaidProtectionCard from "@/components/Dashboard/AutoMod/RaidProtectionCard";
import Container from "@/components/Dashboard/Container";
import Heading from "@/components/Dashboard/Heading";
import CardGrid from "@/components/Dashboard/Layout/CardGrid";
import GuildConfigurationProvider from "@/components/Providers/GuildConfigurationProvider";

export default function AutoModPage() {
    return (
        <Container>
            <Heading>Auto Moderation Settings</Heading>

            <GuildConfigurationProvider>
                <CardGrid>
                    <RaidProtectionCard />
                </CardGrid>
            </GuildConfigurationProvider>
        </Container>
    );
}
