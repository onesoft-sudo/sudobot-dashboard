import { APIMessageRule } from "@/types/APIMessageRule";
import { FC } from "react";
import MessageRule from "./MessageRule";

interface MessageRulesProps {
    rules: APIMessageRule[];
}

const MessageRules: FC<MessageRulesProps> = ({ rules }) => {
    return (
        <div>
            {rules.map((rule, i) => (
                <MessageRule key={`${i}_${rule.type}`} rule={rule} />
            ))}
        </div>
    );
};

export default MessageRules;
