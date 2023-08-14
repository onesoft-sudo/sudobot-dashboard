import { formatDistanceToNowStrict } from "date-fns";

export const wait = (time: number) =>
    new Promise(resolve => setTimeout(resolve, time));

export const formatDuration = (time: number) =>
    formatDistanceToNowStrict(new Date(Date.now() - time));

export const isDashboardPath = (pathname: string) =>
    pathname.startsWith("/dashboard") || pathname.startsWith("/settings");
