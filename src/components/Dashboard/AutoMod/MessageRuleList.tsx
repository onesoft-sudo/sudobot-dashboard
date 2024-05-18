import { useConfigMutationHandlers } from "@/contexts/ConfigMutationProvider";
import { APIMessageRule } from "@/types/APIMessageRule";
import { Objects } from "@/utils/objects";
import { Reorder } from "framer-motion";
import { useCallback, useEffect, useMemo, useState, type FC } from "react";
import MessageRuleItem from "./MessageRuleItem";

type MessageRuleListProps = {
    rules: APIMessageRule[];
    onChange?(rules: APIMessageRule[]): void;
};

const MessageRuleList: FC<MessageRuleListProps> = ({ rules, onChange }) => {
    const initialOrder = useMemo(() => rules.map((rule) => rule.id), [rules]);
    const [sortOrderIds, setSortOrderIds] = useState<string[]>(initialOrder);
    const sortedRules = useMemo(() => {
        return [...rules].sort((a, b) => sortOrderIds.indexOf(a.id) - sortOrderIds.indexOf(b.id));
    }, [rules, sortOrderIds]);
    const { emitter } = useConfigMutationHandlers();
    const handler = useCallback(() => {
        setSortOrderIds(initialOrder);
    }, [initialOrder]);

    useEffect(() => {
        return () => {
            emitter.off("reset::untilSave", handler);
        };
    }, []);

    return (
        <div>
            <Reorder.Group
                axis="y"
                values={sortOrderIds}
                onReorder={(orders) => {
                    if (onChange) {
                        const newRules = [];

                        for (const id of orders) {
                            newRules.push(Objects.notNull(rules.find((rule) => rule.id === id)));
                        }

                        onChange(newRules);
                    }

                    setSortOrderIds(orders);
                    emitter.off("reset::untilSave", handler);
                    emitter.once("reset::untilSave", handler);
                }}
                className="grid grid-cols-1 gap-2"
                as="ul"
            >
                {sortedRules.map((rule, index) => (
                    <MessageRuleItem key={rule.id} rule={rule} index={index} />
                ))}
            </Reorder.Group>
        </div>
    );
};

export default MessageRuleList;
