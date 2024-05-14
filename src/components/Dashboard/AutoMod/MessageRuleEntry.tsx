import { APIMessageRule, APIMessageRuleType } from "@/types/APIMessageRule";
import { useMemo, type FC } from "react";
import { IconType } from "react-icons/lib";
import { MdDomain, MdFilePresent, MdLink, MdPattern, MdTableRows, MdTextSnippet } from "react-icons/md";
import MessageRuleAction from "./MessageRuleAction";
import MessageRuleDisabled from "./MessageRuleDisabled";
import MessageRuleModeInverted from "./MessageRuleModeInverted";

type MessageRuleEntryProps = {
    rule: APIMessageRule;
};

const messageRuleNames: Record<APIMessageRuleType, string> = {
    [APIMessageRuleType.Regex]: "Regex Filter",
    [APIMessageRuleType.Invite]: "Invite Filter",
    [APIMessageRuleType.Word]: "Word Filter",
    [APIMessageRuleType.Embed]: "Embed Filter",
    [APIMessageRuleType.File]: "File Filter",
    [APIMessageRuleType.Domain]: "Domain Filter",
};

const messageRuleIcons: Record<APIMessageRuleType, IconType> = {
    [APIMessageRuleType.Regex]: MdPattern,
    [APIMessageRuleType.Invite]: MdLink,
    [APIMessageRuleType.Word]: MdTextSnippet,
    [APIMessageRuleType.Embed]: MdTableRows,
    [APIMessageRuleType.File]: MdFilePresent,
    [APIMessageRuleType.Domain]: MdDomain,
};

const computeColor = (type: APIMessageRuleType) => {
    let hash = 0;

    for (let i = 0; i < type.length; i++) {
        hash = type.charCodeAt(i) + ((hash << 5) - hash);
    }

    const c = (hash & 0x00ffffff).toString(16).toUpperCase();
    return "#" + "00000".substring(0, 6 - c.length) + c;
};

const MessageRuleEntry: FC<MessageRuleEntryProps> = ({ rule }) => {
    const Icon = messageRuleIcons[rule.type];
    const name = messageRuleNames[rule.type];
    const color = useMemo(() => computeColor(rule.type), [rule.type]);

    return (
        <div
            draggable
            className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-100 py-3 pl-3 pr-4 hover:bg-gray-200 dark:bg-[rgb(35,35,35)] dark:hover:bg-[rgb(50,50,50)]"
        >
            <div className="flex items-center gap-3">
                <Icon
                    className="rounded-lg p-1"
                    size="2rem"
                    style={{
                        color,
                        border: `1px solid ${color}`,
                    }}
                />
                <span className="text-sm font-semibold">{name}</span>

                {!rule.enabled && <MessageRuleDisabled />}
                {rule.mode === "invert" && <MessageRuleModeInverted />}
            </div>

            <div className="flex items-center gap-3">
                {rule.actions.map((action) => (
                    <MessageRuleAction key={action} action={action} />
                ))}
            </div>
        </div>
    );
};

export default MessageRuleEntry;
