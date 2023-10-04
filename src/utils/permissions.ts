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

import { PermissionFlagsBits } from "discord-api-types/v10";

export function getPermissions(): Record<
    keyof typeof PermissionFlagsBits,
    string
> {
    const permissions: any = {};

    for (const key in PermissionFlagsBits) {
        permissions[key] = key.replaceAll(/[A-Z]/g, c => ` ${c}`).trimStart();
    }

    return permissions;
}

export function getPermissionsArray() {
    const permissions: Array<{
        name: string;
        value: keyof typeof PermissionFlagsBits;
    }> = [];

    for (const key in PermissionFlagsBits) {
        permissions.push({
            name: key
                .replace(/([A-Z][a-z]|[A-Z]+(?=[A-Z]|$))/g, " $1")
                .replace(/./, m => m.toUpperCase())
                .trim(),
            value: key as keyof typeof PermissionFlagsBits,
        });
    }

    permissions.sort((a, b) => a.value.localeCompare(b.value));
    return permissions;
}
