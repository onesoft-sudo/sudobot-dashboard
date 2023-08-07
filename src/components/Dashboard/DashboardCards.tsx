"use client";

import { SUPPORT_EMAIL_ADDRESS, SUPPORT_SERVER_INVITE } from "@/utils/links";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
} from "@nextui-org/react";
import { formatDistanceToNowStrict } from "date-fns";
import Link from "next/link";
import { FC } from "react";
import styles from "../../styles/DashboardCards.module.css";

const DashboardCards: FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <Card>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">
                        From the developers
                    </p>
                    <small className="text-default-500">
                        {formatDistanceToNowStrict(
                            new Date("2023-08-07T23:35:00+06:00"),
                            { addSuffix: true }
                        )}
                    </small>
                    <h4 className="font-bold text-large">
                        Help us make the bot even better!
                    </h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    We're adding new features continuously, want to know more
                    about what we plan to implement? Let's discuss what will be
                    the best!
                </CardBody>
                <CardFooter>
                    <Button
                        variant="flat"
                        as={Link}
                        href={SUPPORT_EMAIL_ADDRESS}
                    >
                        Contact Us
                    </Button>
                </CardFooter>
            </Card>

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
        </div>
    );
};

export default DashboardCards;
