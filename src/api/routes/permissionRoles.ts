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

import { API } from "@/utils/api";
import axios, { Axios } from "axios";
import { PermissionFlagsBits } from "discord-api-types/v10";

export function getPermissionRoles(
    {
        guildId,
        token,
    }: {
        guildId: string;
        token: string;
    },
    axiosInstance: Axios = axios
) {
    return axiosInstance.get(API.permissionRoles(guildId), {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

export function patchPermissionRole(
    {
        guildId,
        id,
        token,
        payload,
    }: {
        guildId: string;
        id: string | number;
        token: string;
        payload: {
            name?: string;
            permissions?: Array<keyof typeof PermissionFlagsBits>;
            users?: string[];
            roles?: string[];
        };
    },
    axiosInstance: Axios = axios
) {
    return axiosInstance.patch(API.permissionRoles(guildId, id), payload, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

export function createPermissionRole(
    {
        guildId,
        token,
        payload,
    }: {
        guildId: string;
        token: string;
        payload: {
            name: string;
            permissions?: Array<keyof typeof PermissionFlagsBits>;
            users?: string[];
            roles?: string[];
        };
    },
    axiosInstance: Axios = axios
) {
    return axiosInstance.post(API.permissionRoles(guildId), payload, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

export function deletePermissionRole(
    {
        guildId,
        id,
        token,
    }: {
        guildId: string;
        id: string | number;
        token: string;
    },
    axiosInstance: Axios = axios
) {
    return axiosInstance.delete(API.permissionRoles(guildId, id), {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}
