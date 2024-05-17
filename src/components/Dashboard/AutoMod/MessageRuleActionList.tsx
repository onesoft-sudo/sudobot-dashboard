import { useAppSelector } from "@/redux/hooks/AppStoreHooks";
import { APIModerationAction, APIModerationActionType } from "@/types/APIModerationAction";
import { Reorder } from "framer-motion";
import { useMemo, useState, type FC } from "react";
import MessageRuleActionItem from "./MessageRuleActionItem";

type MessageRuleActionListProps = {
    onChange?(actions: APIModerationAction[]): void;
};

const allActions = Object.values(APIModerationActionType).filter((action) => action[0].toLowerCase() === action[0]);

const MessageRuleActionList: FC<MessageRuleActionListProps> = ({ onChange }) => {
    const rule = useAppSelector((state) => state.messageRuleList.editingRule);
    const [actions, setActions] = useState<APIModerationAction[]>();
    const finalRuleActions = useMemo(() => {
        const actions = [...(rule?.actions ?? [])];

        for (const action of allActions) {
            if (!actions.find((a) => a.type === action)) {
                actions.push({
                    enabled: false,
                    type: action,
                });
            }
        }

        return actions;
    }, [rule]);
    const ruleTypes = useMemo(() => (actions ?? finalRuleActions).map((a) => a.type), [actions, finalRuleActions]);

    const handleChange = (_actions = actions) => {
        if (!onChange) {
            return;
        }

        const finalActions = _actions ?? finalRuleActions;
        onChange(finalActions);
    };

    if (!rule) {
        return null;
    }

    return (
        <div>
            <Reorder.Group
                values={ruleTypes}
                onReorder={(actionTypes) => {
                    const finalActions = actionTypes.map((type) => {
                        return (actions ?? finalRuleActions).find((a) => a.type === type) ?? { enabled: false, type };
                    });

                    handleChange(finalActions);
                    setActions(finalActions);
                }}
                className="flex flex-col gap-2"
            >
                {(actions ?? finalRuleActions).map((action) => (
                    <MessageRuleActionItem
                        key={action.type}
                        action={action.type}
                        enabled={action.enabled}
                        onChange={(isEnabled) => {
                            setActions((prev) => {
                                const newActions = [...(prev ?? finalRuleActions)];
                                const index = newActions.findIndex((a) => a.type === action.type);

                                if (index === -1) {
                                    return prev;
                                }

                                newActions[index] = {
                                    ...newActions[index],
                                    enabled: isEnabled,
                                };

                                handleChange(newActions);
                                return newActions;
                            });
                        }}
                    />
                ))}
            </Reorder.Group>
        </div>
    );
};

export default MessageRuleActionList;
