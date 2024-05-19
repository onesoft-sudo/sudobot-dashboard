import { APIModerationAction } from "./APIModerationAction";

export enum APIMessageRuleType {
    Regex = "regex_filter",
    Invite = "invite_filter",
    Word = "word_filter",
    Embed = "embed_filter",
    File = "file_filter",
    Domain = "domain_filter",
}

export type APIMessageRuleScope = {
    channels?: string[];
    roles?: string[];
    users?: string[];
};

export type APIMessageRule = {
    id: string;
    name?: string;
    type: APIMessageRuleType;
    enabled: boolean;
    mode: "normal" | "invert";
    actions: APIModerationAction[];
    bail?: boolean;
    for?: APIMessageRuleScope;
    exceptions?: APIMessageRuleScope;
};
