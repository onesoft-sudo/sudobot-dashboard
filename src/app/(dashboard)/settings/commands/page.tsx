import CardGrid from "@/components/Dashboard/CardGrid";
import BasicSettingsCard from "@/components/Dashboard/Commands/BasicSettingsCard";
import PrefixCard from "@/components/Dashboard/Commands/PrefixCard";
import Container from "@/components/Dashboard/Container";
import Heading from "@/components/Dashboard/Heading";

export default function CommandSettingsPage() {
    return (
        <Container>
            <Heading>Command Settings</Heading>

            <CardGrid>
                <PrefixCard />
                <BasicSettingsCard />
            </CardGrid>
        </Container>
    );
}
