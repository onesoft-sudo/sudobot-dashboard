const API_URL = process.env.NEXT_PUBLIC_API_URL;
export class API {
    static announcements(): string {
        return `${API_URL}/announcements`;
    }

    static login() {
        return `${API_URL}/auth/login`;
    }

    static discord() {
        return `${API_URL}/auth/discord`;
    }

    static config(guildId: string) {
        return `${API_URL}/config/${encodeURIComponent(guildId)}`;
    }
}
