const { NEXT_PUBLIC_API_URL: API_URL } = process.env;

export class API {
    static login() {
        return `${API_URL}/auth/login`;
    }
}
