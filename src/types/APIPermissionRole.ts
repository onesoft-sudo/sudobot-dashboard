export interface APIPermissionRole {
    id: number;
    name?: string;
    level?: number;
    permissions?: string[];
    roles?: { id: string; name: string }[];
    users?: { id: string; name: string }[];
}

export type APIPermissionMode = "discord" | "advanced" | "levels";
