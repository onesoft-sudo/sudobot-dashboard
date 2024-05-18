import { APIModerationActionType } from "@/types/APIModerationAction";
import { Tooltip } from "@nextui-org/react";
import { type FC } from "react";
import { actionClasses, actionIcons, actionNames } from "./MessageRuleActionName";

type MessageRuleActionProps = {
    action: APIModerationActionType;
};

const MessageRuleActionIcon: FC<MessageRuleActionProps> = ({ action }) => {
    const Icon = actionIcons[action];
    const className = actionClasses[action];
    const name = actionNames[action];

    return (
        <Tooltip content={name}>
            <div>
                <Icon size="1rem" className={className} />
            </div>
        </Tooltip>
    );
};

export default MessageRuleActionIcon;
