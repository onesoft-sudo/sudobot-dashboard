export enum APIModerationActionType {
    Warn = "warn",
    Mute = "mute",
    Kick = "kick",
    Ban = "ban",
    Softban = "softban",
    TemporaryBan = "tempban",
    ModifyRoles = "role",
    DeleteMessage = "delete",
    ClearMessages = "clear",
}

export type APIModerationAction = {
    type: APIModerationActionType;
    enabled: boolean;
};
