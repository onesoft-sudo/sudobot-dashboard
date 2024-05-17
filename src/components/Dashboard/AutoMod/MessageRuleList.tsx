import { APIMessageRule } from "@/types/APIMessageRule";
import { Reorder } from "framer-motion";
import { useMemo, useState, type FC } from "react";
import MessageRuleItem from "./MessageRuleItem";

type MessageRuleListProps = {
    rules: APIMessageRule[];
};

const MessageRuleList: FC<MessageRuleListProps> = ({ rules }) => {
    const [sortOrderIds, setSortOrderIds] = useState<string[]>(() => rules.map((rule) => rule.id));
    const sortedRules = useMemo(() => {
        return [...rules].sort((a, b) => sortOrderIds.indexOf(a.id) - sortOrderIds.indexOf(b.id));
    }, [rules, sortOrderIds]);

    return (
        <div>
            <Reorder.Group
                axis="y"
                values={sortOrderIds}
                onReorder={setSortOrderIds}
                className="grid grid-cols-1 gap-2"
                as="ul"
            >
                {sortedRules.map((rule, index) => (
                    <MessageRuleItem
                        key={rule.id}
                        rule={rule}
                        index={index}
                        sortOrderIds={sortOrderIds}
                        setSortOrderIds={setSortOrderIds}
                    />
                ))}
            </Reorder.Group>
        </div>
    );
};

export default MessageRuleList;
