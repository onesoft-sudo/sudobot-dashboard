"use client";

import { APIAnnouncement } from "@/types/APIAnnouncement";
import { SUPPORT_EMAIL_ADDRESS } from "@/utils/links";
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

interface DashboardAnnouncementCardProps {
    data: APIAnnouncement;
}

const DashboardAnnouncementCard: FC<DashboardAnnouncementCardProps> = ({
    data,
}) => {
    return (
        <Card>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                {data.from && (
                    <p className="text-tiny uppercase font-bold">{data.from}</p>
                )}
                <small className="text-default-500">
                    {formatDistanceToNowStrict(new Date(data.createdAt), {
                        addSuffix: true,
                    })}
                </small>
                <h4 className="font-bold text-large">{data.title}</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                {data.description}
            </CardBody>
            {data.buttons?.length && (
                <CardFooter>
                    {data.buttons.map(button => (
                        <Button
                            key={button.url + button.name}
                            variant="flat"
                            as={Link}
                            href={button.url.replaceAll(
                                "{SUPPORT_EMAIL_ADDRESS}",
                                SUPPORT_EMAIL_ADDRESS
                            )}
                        >
                            {button.name}
                        </Button>
                    ))}
                </CardFooter>
            )}
        </Card>
    );
};

export default DashboardAnnouncementCard;
