"use client";

import { getStatus } from "@/api/status";
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
    });

    if (query.isSuccess) {
        console.log(query.data.data);
        query.data!.data.status = "maintenence";
    }

    return query.isLoading ? (
        <Skeleton variant="rounded" className="rounded-xl" height="100%" />
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
                    <StatusCardIcon
                        status={query.data?.data.status ?? "operational"}
                    />
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
                                )[
                                    query.data?.data
                                        .status as keyof typeof statusTypeToStatusString
                                ]
                            )}
                        >
                            {
                                statusTypeToStatusString[
                                    query.data?.data
                                        .status as keyof typeof statusTypeToStatusString
                                ]
                            }
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
