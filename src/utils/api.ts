const API_URL = process.env.NEXT_PUBLIC_API_URL;
export class API {
    static login() {
        return `${API_URL}/auth/login`;
    }
}
