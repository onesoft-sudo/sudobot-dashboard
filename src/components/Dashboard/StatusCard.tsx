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

import { getStatus } from "@/api/routes/status";
import { APIStatus } from "@/types/APIStatus";
import { Skeleton } from "@mui/material";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { twMerge } from "tailwind-merge";
import StatusCardIcon from "./StatusCardIcon";

const statusTypeToStatusString: Record<APIStatus, string> = {
    degraded: "Degraded Performance",
    error: "System Error",
    maintenence: "Under Maintenance",
    major_outage: "Major Outage",
    operational: "Operational",
    partial_outage: "Partial Outage",
};

const StatusCard: FC = () => {
    const query = useQuery({
        queryFn: getStatus,
        queryKey: ["status"],
        refetchInterval: 300_000,
        refetchOnWindowFocus: false,
    });

    const status = (
        query.isError ? "major_outage" : query.data?.data?.status
    ) as keyof typeof statusTypeToStatusString;

    return query.isLoading ? (
        <Skeleton
            variant="rounded"
            className="rounded-xl"
            classes={{
                rounded: "h-[150px] md:h-[100%]",
            }}
        />
    ) : (
        <Card>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <small className="text-default-500">
                    Updates in each five minutes
                </small>
                <h4 className="font-bold text-large">System Status</h4>
            </CardHeader>

            <CardBody className="overflow-visible py-2 relative">
                <div className="flex items-center justify-center h-[80%] min-h-[100px]">
                    <StatusCardIcon status={status ?? "operational"} />
                    <p className={"inline-block ml-5"}>
                        <span
                            className={twMerge(
                                "text-3xl md:text-4xl",
                                (
                                    {
                                        maintenence: "text-blue-500",
                                        degraded: "text-orange-400",
                                        error: "text-red-500",
                                        major_outage: "text-red-500",
                                        operational: "text-white",
                                        partial_outage: "text-red-400",
                                    } satisfies typeof statusTypeToStatusString
                                )[status]
                            )}
                        >
                            {statusTypeToStatusString[status]}
                        </span>
                    </p>
                </div>

                {query.data?.data.description && (
                    <p className="text-[#999] block text-center">
                        {query.data?.data.description}
                    </p>
                )}
            </CardBody>
        </Card>
    );
};

export default StatusCard;
