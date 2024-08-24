export const DONATION_URL = process.env.NEXT_PUBLIC_DONATION_URL ?? "";

export type LinkInfo = {
    title: string;
    url?: string;
    id?: string;
    external?: boolean;
};
