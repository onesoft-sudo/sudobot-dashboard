export interface APIDeletedMessageMentions {
    everyone: boolean;
    members?: Array<{
        id: string;
        nickname: string;
    }>;
    users: Array<{
        id: string;
        username: string;
    }>;
    roles: Array<{
        id: string;
        name: string;
    }>;
    channels: Array<{
        id: string;
        name: string;
    }>;
}
