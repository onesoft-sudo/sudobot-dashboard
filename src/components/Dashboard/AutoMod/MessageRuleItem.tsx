import { APIMessageRule } from "@/types/APIMessageRule";
import { Reorder, useDragControls } from "framer-motion";
import { type FC } from "react";
import MessageRuleEntry from "./MessageRuleEntry";
import MessageRuleIndex from "./MessageRuleIndex";

type MessageRuleItemProps = {
    rule: APIMessageRule;
    index: number;
};

const MessageRuleItem: FC<MessageRuleItemProps> = ({ rule, index }) => {
    const controls = useDragControls();

    return (
        <Reorder.Item
            value={rule.id}
            className="grid grid-cols-[50px_auto] gap-2"
            as="li"
            dragControls={controls}
            dragListener={false}
        >
            <MessageRuleIndex index={index + 1} />
            <MessageRuleEntry
                key={rule.id}
                rule={rule}
                index={index}
                onPointerDown={(event) => controls.start(event)}
            />
        </Reorder.Item>
    );
};

export default MessageRuleItem;
