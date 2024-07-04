export type GuildConfiguration = {
    prefix: string;
    commands?: GuildCommandConfiguration;
};

type GuildCommandConfiguration = {
    mention_prefix: boolean;
};
