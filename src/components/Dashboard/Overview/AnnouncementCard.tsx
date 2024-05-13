import { Route, resolveRoute } from "@/api/Routes";
import { Announcement } from "@/types/Announcement";
import { Card, CardBody, CardFooter, CardHeader, Divider } from "@nextui-org/react";
import { formatDistanceToNowStrict } from "date-fns";
import { Fragment } from "react";
import { MdCampaign } from "react-icons/md";

export default async function AnnouncementCard() {
    const response = await fetch(resolveRoute(Route.LATEST_ANNOUNCEMENT), {
        next: {
            revalidate: 60,
        },
    });
    const announcement: Announcement = await response.json();

    return (
        <Card shadow="sm">
            <CardHeader className="flex gap-3">
                <MdCampaign size="2rem" />
                <div className="flex flex-col">
                    <p className="text-xs uppercase">From the {announcement.rootFrom ?? "OSN Developers"}</p>
                    <p className="text-base">
                        {announcement.title} &bull;{" "}
                        <span className="text-default-500">
                            {formatDistanceToNowStrict(announcement.timestamp, { addSuffix: true })}
                        </span>
                    </p>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <p className="text-base">
                    {announcement.content.split("\n\n").map((part) => (
                        <Fragment key={part}>
                            {part}
                            <br />
                        </Fragment>
                    ))}{" "}
                    <span className="italic text-default-500">&mdash; {announcement.from}</span>
                </p>
            </CardBody>
            <Divider />
            <CardFooter>
                <p className="text-small text-default-500">
                    {announcement.footer ?? "If you have any questions, feel free to ask."}
                </p>
            </CardFooter>
        </Card>
    );
}
