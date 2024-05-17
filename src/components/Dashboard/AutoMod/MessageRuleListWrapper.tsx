import { APIMessageRule } from "@/types/APIMessageRule";
import { type FC } from "react";
import MessageRuleEditModal from "./MessageRuleEditModal";
import MessageRuleList from "./MessageRuleList";

type MessageRuleListWrapperProps = {
    rules: APIMessageRule[];
};

const MessageRuleListWrapper: FC<MessageRuleListWrapperProps> = ({ rules }) => {
    return (
        <>
            <MessageRuleEditModal rules={rules} />
            <MessageRuleList rules={rules} />
        </>
    );
};

export default MessageRuleListWrapper;
