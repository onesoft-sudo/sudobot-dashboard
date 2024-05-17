import { useAppSelector } from "@/redux/hooks/AppStoreHooks";
import { APIModerationAction } from "@/types/APIModerationAction";
import { Reorder } from "framer-motion";
import { useMemo, useState, type FC } from "react";
import MessageRuleActionItem from "./MessageRuleActionItem";

const allActions = Object.values(APIModerationAction).filter((action) => action[0].toLowerCase() === action[0]);

const MessageRuleActionList: FC = () => {
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
