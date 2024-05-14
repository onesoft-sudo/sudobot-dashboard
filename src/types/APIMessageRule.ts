import { APIModerationAction } from "./APIModerationAction";

export enum APIMessageRuleType {
    Regex = "regex_filter",
    Invite = "invite_filter",
    Word = "word_filter",
    Embed = "embed_filter",
    File = "file_filter",
    Domain = "domain_filter",
}

export type APIMessageRule = {
    id: string;
    type: APIMessageRuleType;
    enabled: boolean;
    mode: "normal" | "invert";
    actions: APIModerationAction[];
};
