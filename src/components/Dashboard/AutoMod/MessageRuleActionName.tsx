import { APIModerationAction } from "@/types/APIModerationAction";
import { type FC } from "react";
import { IconType } from "react-icons/lib";
import {
    MdCleaningServices,
    MdEdit,
    MdExitToApp,
    MdGavel,
    MdLockClock,
    MdOutlineGavel,
    MdRemoveCircle,
    MdWarning,
} from "react-icons/md";

type MessageRuleActionNameProps = {
    action: APIModerationAction;
};

export const actionNames: Record<APIModerationAction, string> = {
    [APIModerationAction.Ban]: "Ban Member",
    [APIModerationAction.Kick]: "Kick Member",
    [APIModerationAction.Mute]: "Mute Member",
    [APIModerationAction.Warn]: "Warn Member",
    [APIModerationAction.DeleteMessage]: "Delete Message",
    [APIModerationAction.Softban]: "Soft Ban Member",
    [APIModerationAction.ClearMessages]: "Clear Recent Messages from Member",
    [APIModerationAction.ModifyRoles]: "Modify Member Roles",
    [APIModerationAction.TemporaryBan]: "Temporarily Ban Member",
};

export const actionIcons: Record<APIModerationAction, IconType> = {
    [APIModerationAction.DeleteMessage]: MdRemoveCircle,
    [APIModerationAction.Warn]: MdWarning,
    [APIModerationAction.Kick]: MdExitToApp,
    [APIModerationAction.Ban]: MdGavel,
    [APIModerationAction.Mute]: MdLockClock,
    [APIModerationAction.Softban]: MdOutlineGavel,
    [APIModerationAction.ModifyRoles]: MdEdit,
    [APIModerationAction.ClearMessages]: MdCleaningServices,
    [APIModerationAction.TemporaryBan]: MdOutlineGavel,
};

export const actionClasses: Record<APIModerationAction, string> = {
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

const MessageRuleActionName: FC<MessageRuleActionNameProps> = ({ action }) => {
    const name = actionNames[action];
    const Icon = actionIcons[action];

    return (
        <div className="flex items-center gap-2">
            <Icon size="1.5rem" className={actionClasses[action]} />
            <span>{name}</span>
        </div>
    );
};

export default MessageRuleActionName;
