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
