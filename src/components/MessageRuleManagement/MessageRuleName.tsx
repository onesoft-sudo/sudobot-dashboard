import { APIMessageRule } from "@/types/APIMessageRule";
import { FC } from "react";

type Type = APIMessageRule["type"];

interface MessageRuleIconProps {
    type: Type;
}

const names: Record<Type, string> = {
    anti_invite: "Anti Invite",
    block_mass_mention: "Block Mass Mention",
    block_repeated_text: "Block Repeated Text",
    blocked_file_extension: "Block File with Specific Extensions",
    blocked_mime_type: "Block Specific File Types",
    domain: "Block Domains",
    regex_filter: "Regex (Block)",
    regex_must_match: "Regex (Must match)",
};

const MessageRuleName: FC<MessageRuleIconProps> = ({ type }) => {
    return names[type];
};

export default MessageRuleName;
