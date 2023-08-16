export interface APIPermissionRole {
    id: number;
    name?: string;
    level?: number;
    permissions?: string[];
    roles?: string[];
    users?: string[];
}
