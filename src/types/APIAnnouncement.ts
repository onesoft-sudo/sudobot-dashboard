export interface APIAnnouncement {
    from?: string;
    createdAt: Date;
    title: string;
    description: string;
    buttons?: { name: string; url: string }[];
}
