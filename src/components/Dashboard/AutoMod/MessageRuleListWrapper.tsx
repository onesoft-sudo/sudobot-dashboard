import { APIMessageRule } from "@/types/APIMessageRule";
import { type FC } from "react";
import MessageRuleEditModal from "./MessageRuleEditModal";
import MessageRuleList from "./MessageRuleList";

type MessageRuleListWrapperProps = {
    rules: APIMessageRule[];
    onChange?(rules: APIMessageRule[]): void;
};

const MessageRuleListWrapper: FC<MessageRuleListWrapperProps> = ({ rules, onChange }) => {
    return (
        <>
            <MessageRuleEditModal rules={rules} />
            <MessageRuleList rules={rules} onChange={onChange} />
        </>
    );
};

export default MessageRuleListWrapper;
