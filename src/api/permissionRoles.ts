import { API } from "@/utils/api";
import axios from "axios";
import { PermissionFlagsBits } from "discord-api-types/v10";

export function getPermissionRoles({
    guildId,
    token,
}: {
    guildId: string;
    token: string;
}) {
    return axios.get(API.permissionRoles(guildId), {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

export function patchPermissionRole({
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
}) {
    return axios.patch(API.permissionRoles(guildId, id), payload, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

export function createPermissionRole({
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
}) {
    return axios.post(API.permissionRoles(guildId), payload, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

export function deletePermissionRole({
    guildId,
    id,
    token,
}: {
    guildId: string;
    id: string | number;
    token: string;
}) {
    return axios.delete(API.permissionRoles(guildId, id), {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}
