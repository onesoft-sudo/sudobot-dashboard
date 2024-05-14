import { Route, resolveRoute } from "@/api/Routes";
import { Announcement } from "@/types/Announcement";
import AnnouncementCardClient from "./AnnouncementCardClient";

export default async function AnnouncementCard() {
    const response = await fetch(resolveRoute(Route.LATEST_ANNOUNCEMENT), {
        next: {
            revalidate: 60,
        },
    });
    const announcement: Announcement = await response.json();

    return <AnnouncementCardClient announcement={announcement} />;
}
