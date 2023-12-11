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

export const formatSize = (size: number) => {
    const units = ["B", "KB", "MB", "GB", "TB"];
    let unit = 0;

    while (size > 1024) {
        size /= 1024;
        unit++;
    }

    return `${size.toFixed(2)} ${units[unit]}`;
};

export const classNames = (
    classes: Record<string, boolean>,
    base: string[] | string = []
) => {
    let classNameString = Array.isArray(base) ? base.join(" ") : base;

    for (const className in classes) {
        if (classes[className]) {
            classNameString += ` ${className}`;
        }
    }

    return classNameString.trimStart();
};

export const cx = classNames;
