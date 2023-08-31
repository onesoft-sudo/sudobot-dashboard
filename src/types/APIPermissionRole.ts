export interface APIPermissionRole {
    id: number;
    name?: string;
    grantedPermissions?: string[];
    roles?: { id: string; name: string }[];
    users?: { id: string; name: string }[];
    guild_id: string;
}

export type APIPermissionMode = "discord" | "advanced" | "levels";
