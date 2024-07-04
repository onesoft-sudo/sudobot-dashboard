import PrefixCard from "@/components/Dashboard/Commands/PrefixCard";
import Container from "@/components/Dashboard/Container";
import Heading from "@/components/Dashboard/Heading";
import CardGrid from "@/components/Dashboard/Layout/CardGrid";
import GuildConfigurationProvider from "@/components/Providers/GuildConfigurationProvider";

export default function CommandSettingsPage() {
    return (
        <Container>
            <Heading>Command Settings</Heading>

            <GuildConfigurationProvider>
                <CardGrid>
                    <PrefixCard />
                </CardGrid>
            </GuildConfigurationProvider>
        </Container>
    );
}
