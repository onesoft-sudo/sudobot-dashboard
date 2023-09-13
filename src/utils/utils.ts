import { formatDistanceToNowStrict, formatRelative } from "date-fns";
import { enUS } from "date-fns/locale";

export const wait = (time: number) =>
    new Promise(resolve => setTimeout(resolve, time));

export const formatDuration = (time: number) =>
    formatDistanceToNowStrict(new Date(Date.now() - time));

export const isDashboardPath = (pathname: string) =>
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/settings") ||
    pathname.startsWith("/account");

export const avatarURL = (id: string, avatar: string) =>
    `https://cdn.discordapp.com/avatars/${encodeURIComponent(
        id
    )}/${encodeURIComponent(avatar)}.${
        avatar.startsWith("a_") ? "gif" : "webp"
    }`;

export const formatDistance = (date: Date) =>
    formatRelative(date, new Date(), {
        locale: {
            ...enUS,
            formatRelative: token =>
                ((
                    {
                        lastWeek: "dd/MM/yyyy h:ii a",
                        yesterday: "'Yesterday at' h:ii a",
                        today: "'Today at' h:ii a",
                        tomorrow: "'Tomorrow at' h:ii a",
                        nextWeek: "dd/MM/yyyy h:ii a",
                        other: "dd/MM/yyyy h:ii a",
                    } as any
                )[token]),
        },
    });
