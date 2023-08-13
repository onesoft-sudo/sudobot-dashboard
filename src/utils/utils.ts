import { formatDistanceToNowStrict } from "date-fns";

export const wait = (time: number) =>
    new Promise(resolve => setTimeout(resolve, time));

export const formatDuration = (time: number) =>
    formatDistanceToNowStrict(new Date(Date.now() - time));
