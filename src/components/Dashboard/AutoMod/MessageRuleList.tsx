import { APIMessageRule } from "@/types/APIMessageRule";
import { Fragment, type FC } from "react";
import MessageRuleEntry from "./MessageRuleEntry";
import MessageRuleIndex from "./MessageRuleIndex";

type MessageRuleListProps = {
    rules: APIMessageRule[];
};

const MessageRuleList: FC<MessageRuleListProps> = ({ rules }) => {
    return (
        <div className="grid grid-cols-[50px_auto] gap-2">
            {rules.map((rule, index) => (
                <Fragment key={rule.id}>
                    <MessageRuleIndex index={index + 1} />
                    <MessageRuleEntry rule={rule} />
                </Fragment>
            ))}
        </div>
    );
};

export default MessageRuleList;
