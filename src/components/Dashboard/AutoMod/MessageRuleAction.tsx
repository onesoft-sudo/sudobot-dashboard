import { APIModerationAction } from "@/types/APIModerationAction";
import { Tooltip } from "@nextui-org/react";
import { type FC } from "react";
import { IconType } from "react-icons/lib";
import {
    MdClearAll,
    MdDelete,
    MdEdit,
    MdExitToApp,
    MdGavel,
    MdLockClock,
    MdOutlineGavel,
    MdWarning,
} from "react-icons/md";

type MessageRuleActionProps = {
    action: APIModerationAction;
};

const icons: Record<APIModerationAction, IconType> = {
    [APIModerationAction.DeleteMessage]: MdDelete,
    [APIModerationAction.Warn]: MdWarning,
    [APIModerationAction.Kick]: MdExitToApp,
    [APIModerationAction.Ban]: MdGavel,
    [APIModerationAction.Mute]: MdLockClock,
    [APIModerationAction.Softban]: MdOutlineGavel,
    [APIModerationAction.ModifyRoles]: MdEdit,
    [APIModerationAction.ClearMessages]: MdClearAll,
    [APIModerationAction.TemporaryBan]: MdOutlineGavel,
};

const classes = {
    [APIModerationAction.DeleteMessage]: "text-red-500",
    [APIModerationAction.Warn]: "text-yellow-500",
    [APIModerationAction.Kick]: "text-yellow-500",
    [APIModerationAction.Ban]: "text-red-500",
    [APIModerationAction.Mute]: "text-yellow-500",
    [APIModerationAction.Softban]: "text-yellow-500",
    [APIModerationAction.ModifyRoles]: "text-blue-500",
    [APIModerationAction.ClearMessages]: "text-blue-500",
    [APIModerationAction.TemporaryBan]: "text-orange-500",
};

const descriptions = {
    [APIModerationAction.DeleteMessage]: "Delete Message",
    [APIModerationAction.Warn]: "Warn",
    [APIModerationAction.Kick]: "Kick",
    [APIModerationAction.Ban]: "Ban",
    [APIModerationAction.Mute]: "Mute",
    [APIModerationAction.Softban]: "Soft Ban",
    [APIModerationAction.ModifyRoles]: "Modify Roles",
    [APIModerationAction.ClearMessages]: "Clear Messages",
    [APIModerationAction.TemporaryBan]: "Temporary Ban",
};

const MessageRuleAction: FC<MessageRuleActionProps> = ({ action }) => {
    const Icon = icons[action];
    const className = classes[action];
    const description = descriptions[action];

    return (
        <Tooltip content={description}>
            <div>
                <Icon size="1rem" className={className} />
            </div>
        </Tooltip>
    );
};

export default MessageRuleAction;
