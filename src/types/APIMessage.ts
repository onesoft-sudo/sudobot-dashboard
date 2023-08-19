export interface APIDeletedMessage {
    id: string;
    content: string;
    author: {
        id: string;
        username: string;
        avatar: string;
        bot: boolean;
    };
    member: {
        id: string;
        nickname?: string;
    };
    authorColor?: number;
    authorAvatarURL: string;
    authorRoleIcon?: string;
    authorRoleName?: string;
    createdTimestamp: string;
}
