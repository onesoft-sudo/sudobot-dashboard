/*
* This file is part of SudoBot Dashboard.
*
* Copyright (C) 2021-2023 OSN Developers.
*
* SudoBot Dashboard is free software; you can redistribute it and/or modify it
* under the terms of the GNU Affero General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* SudoBot Dashboard is distributed in the hope that it will be useful, but
* WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU Affero General Public License for more details.
*
* You should have received a copy of the GNU Affero General Public License
* along with SudoBot Dashboard. If not, see <https://www.gnu.org/licenses/>.
*/

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
