const API_URL = process.env.NEXT_PUBLIC_API_URL;
export class API {
    static announcements(): string {
        return `${API_URL}/announcements`;
    }

    static status() {
        return `${API_URL}/status`;
    }

    static login() {
        return `${API_URL}/auth/login`;
    }

    static recovery() {
        return `${API_URL}/auth/recovery`;
    }

    static recoveryToken() {
        return `${API_URL}/auth/recovery_token`;
    }

    static reset() {
        return `${API_URL}/auth/reset`;
    }

    static user(userId: string) {
        return `${API_URL}/users/${encodeURIComponent(userId)}`;
    }

    static discord() {
        return `${API_URL}/auth/discord`;
    }

    static config(guildId: string) {
        return `${API_URL}/config/${encodeURIComponent(guildId)}`;
    }

    static permissionRoles(guildId: string, id?: number | string) {
        return (
            `${API_URL}/permission_roles/${encodeURIComponent(guildId)}` +
            (id !== undefined ? `/${encodeURIComponent(id.toString())}` : "")
        );
    }
}
