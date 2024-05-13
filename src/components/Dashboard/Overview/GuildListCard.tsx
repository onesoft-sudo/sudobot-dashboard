"use client";

import { INVITE_REQUEST_URL } from "@/constants/links";
import { Card, CardBody, CardFooter, CardHeader, Divider } from "@nextui-org/react";
import Link from "next/link";
import { MdApps } from "react-icons/md";
import GuildList from "./GuildList";

export default function GuildListCard() {
    return (
        <Card shadow="sm">
            <CardHeader className="flex gap-3">
                <MdApps size="2rem" />
                <div className="flex flex-col">
                    <p className="text-base">Servers</p>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <GuildList />
            </CardBody>
            <Divider />
            <CardFooter>
                <p className="text-small text-default-500">
                    Want to add SudoBot to another server?{" "}
                    <Link href={INVITE_REQUEST_URL} className="link">
                        Click here
                    </Link>
                    .
                </p>
            </CardFooter>
        </Card>
    );
}
