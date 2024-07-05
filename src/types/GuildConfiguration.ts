export type GuildConfiguration = {
    prefix: string;
    commands?: GuildCommandConfiguration;
    raid_protection?: RaidProtectionConfig;
};

type GuildCommandConfiguration = {
    mention_prefix: boolean;
};

type RaidProtectionConfig = {
    enabled: boolean;
    threshold: number;
    timeframe: number;
    action: "lock" | "antijoin" | "lock_and_antijoin" | "none" | "auto";
    channels?: string[];
};
