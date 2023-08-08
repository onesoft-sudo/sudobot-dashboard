"use client";

import { APIAnnouncement } from "@/types/APIAnnouncement";
import { SUPPORT_EMAIL_ADDRESS, SUPPORT_SERVER_INVITE } from "@/utils/links";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
} from "@nextui-org/react";
import Link from "next/link";
import { FC } from "react";
import styles from "../../styles/DashboardCards.module.css";
import DashboardAnnouncementCard from "./DashboardAnnouncementCard";

interface DashboardCardsProps {
    announcements?: APIAnnouncement[];
}

const DashboardCards: FC<DashboardCardsProps> = ({ announcements = [] }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {announcements.length > 0 && (
                <DashboardAnnouncementCard data={announcements[0]} />
            )}

            <Card>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <small className="text-default-500">
                        Updates in each five minutes
                    </small>
                    <h4 className="font-bold text-large">System Status</h4>
                </CardHeader>

                <CardBody className="overflow-visible py-2 relative">
                    <div className="flex items-center justify-center h-[80%]">
                        <div className={`${styles.circle}`}></div>

                        <p className="inline-block text-3xl md:text-4xl ml-5">
                            Operational
                        </p>
                    </div>
                </CardBody>
            </Card>

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
        </div>
    );
};

export default DashboardCards;