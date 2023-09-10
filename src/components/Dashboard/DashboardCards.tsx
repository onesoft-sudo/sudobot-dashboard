"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { APIAnnouncement } from "@/types/APIAnnouncement";
import {
    BOT_INVITE_REQUEST_URL,
    SUPPORT_EMAIL_ADDRESS,
    SUPPORT_SERVER_INVITE,
} from "@/utils/links";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
} from "@nextui-org/react";
import { FC } from "react";
import Link from "../Router/Link";
import DashboardAnnouncementCard from "./DashboardAnnouncementCard";
import StatusCard from "./StatusCard";

interface DashboardCardsProps {
    announcements?: APIAnnouncement[];
}

const DashboardCards: FC<DashboardCardsProps> = ({ announcements = [] }) => {
    const { user } = useAuthContext();

    if (!user) {
        return;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-3 md:px-0">
            {announcements.length > 0 && (
                <DashboardAnnouncementCard data={announcements[0]} />
            )}

            <StatusCard />

            <Card>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <small className="text-default-500">Help & Support</small>
                    <h4 className="font-bold text-large">Need help?</h4>
                </CardHeader>

                <CardBody className="overflow-visible py-2 relative">
                    Feel free to contact us anytime if you need help. You can
                    either join our Discord Server or Email us directly.
                </CardBody>

                <CardFooter>
                    <Button
                        variant="flat"
                        as={Link}
                        href={SUPPORT_EMAIL_ADDRESS}
                    >
                        Email
                    </Button>

                    <Button
                        variant="flat"
                        as={Link}
                        href={SUPPORT_SERVER_INVITE}
                        className="ml-2"
                    >
                        Discord
                    </Button>
                </CardFooter>
            </Card>

            {announcements.length > 1 &&
                announcements.map(announcement => (
                    <DashboardAnnouncementCard
                        key={announcement.title}
                        data={announcement}
                    />
                ))}

            <Card>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <h4 className="font-bold text-large">Servers</h4>
                </CardHeader>
                <CardBody>
                    The bot is in {user?.guilds.length ?? 0} server
                    {(user?.guilds.length ?? 0) > 1 ? "s" : ""} where you have
                    permission to manage the settings.
                    <ul className="list-disc ml-5 mt-3">
                        {user?.guilds.map(guild => (
                            <li key={guild.id}>
                                <Link className="link" href="/dashboard">
                                    {guild.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </CardBody>

                <CardFooter>
                    <Button
                        variant="flat"
                        as={Link}
                        href={BOT_INVITE_REQUEST_URL}
                    >
                        Add The Bot To Another Server
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default DashboardCards;
