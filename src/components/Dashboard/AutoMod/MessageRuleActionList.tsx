import { useAppSelector } from "@/redux/hooks/AppStoreHooks";
import { APIModerationAction } from "@/types/APIModerationAction";
import { Reorder } from "framer-motion";
import { useEffect, useMemo, useRef, useState, type FC } from "react";
import MessageRuleActionItem from "./MessageRuleActionItem";

type ActionObject = {
    type: APIModerationAction;
    enabled: boolean;
};

type MessageRuleActionListProps = {
    onChange?(actions: ActionObject[]): void;
};

const allActions = Object.values(APIModerationAction).filter((action) => action[0].toLowerCase() === action[0]);

const MessageRuleActionList: FC<MessageRuleActionListProps> = ({ onChange }) => {
    const rule = useAppSelector((state) => state.messageRuleList.editingRule);
    const [actions, setActions] = useState<APIModerationAction[]>();
    const [enabledActions, setEnabledActions] = useState<APIModerationAction[]>([]);
    const finalRuleActions = useMemo(() => {
        const actions = [...(rule?.actions ?? [])];

        for (const action of allActions) {
            if (!actions.includes(action)) {
                actions.push(action);
            }
        }

        return actions;
    }, [rule]);
    const firstRenderRef = useRef(true);

    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
            return;
        }

        if (!onChange) {
            return;
        }

        const finalActions = actions ?? finalRuleActions;
        const actionArray = [];

        for (const action of finalActions) {
            actionArray.push({
                type: action,
                enabled: enabledActions.includes(action) || !!rule?.actions.includes(action),
            });
        }

        onChange(actionArray);
    }, [enabledActions, actions, finalRuleActions]);

    if (!rule) {
        return null;
    }

    return (
        <div>
            <Reorder.Group values={actions ?? finalRuleActions} onReorder={setActions} className="flex flex-col gap-2">
                {(actions ?? finalRuleActions).map((action) => (
                    <MessageRuleActionItem
                        key={action}
                        action={action}
                        enabled={rule.actions.includes(action) || enabledActions.includes(action)}
                        onChange={(isEnabled) => {
                            setEnabledActions((actions) => {
                                if (isEnabled) {
                                    return [...actions, action];
                                }

                                return actions.filter((a) => a !== action);
                            });
                        }}
                    />
                ))}
            </Reorder.Group>
        </div>
    );
};

export default MessageRuleActionList;
