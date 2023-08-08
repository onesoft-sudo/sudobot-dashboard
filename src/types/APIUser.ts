export interface APIUser {
    id: number;
    token: string;
    name?: string | null;
    username: string;
    createdAt: Date;
}
