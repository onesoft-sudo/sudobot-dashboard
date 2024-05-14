import MessageRuleManagementCard from "@/components/Dashboard/AutoMod/MessageRuleManagementCard";
import CardGrid from "@/components/Dashboard/CardGrid";
import Container from "@/components/Dashboard/Container";
import Heading from "@/components/Dashboard/Heading";

export default function AutoModPage() {
    return (
        <Container>
            <Heading>Auto Moderation Settings</Heading>

            <CardGrid>
                <MessageRuleManagementCard />
            </CardGrid>
        </Container>
    );
}
