import { APIModerationActionType } from "@/types/APIModerationAction";
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
    action: APIModerationActionType;
};

export const actionNames: Record<APIModerationActionType, string> = {
    [APIModerationActionType.Ban]: "Ban Member",
    [APIModerationActionType.Kick]: "Kick Member",
    [APIModerationActionType.Mute]: "Mute Member",
    [APIModerationActionType.Warn]: "Warn Member",
    [APIModerationActionType.DeleteMessage]: "Delete Message",
    [APIModerationActionType.Softban]: "Soft Ban Member",
    [APIModerationActionType.ClearMessages]: "Clear Recent Messages from Member",
    [APIModerationActionType.ModifyRoles]: "Modify Member Roles",
    [APIModerationActionType.TemporaryBan]: "Temporarily Ban Member",
};

export const actionIcons: Record<APIModerationActionType, IconType> = {
    [APIModerationActionType.DeleteMessage]: MdRemoveCircle,
    [APIModerationActionType.Warn]: MdWarning,
    [APIModerationActionType.Kick]: MdExitToApp,
    [APIModerationActionType.Ban]: MdGavel,
    [APIModerationActionType.Mute]: MdLockClock,
    [APIModerationActionType.Softban]: MdOutlineGavel,
    [APIModerationActionType.ModifyRoles]: MdEdit,
    [APIModerationActionType.ClearMessages]: MdCleaningServices,
    [APIModerationActionType.TemporaryBan]: MdOutlineGavel,
};

export const actionClasses: Record<APIModerationActionType, string> = {
    [APIModerationActionType.DeleteMessage]: "text-red-500",
    [APIModerationActionType.Warn]: "text-yellow-500",
    [APIModerationActionType.Kick]: "text-yellow-500",
    [APIModerationActionType.Ban]: "text-red-500",
    [APIModerationActionType.Mute]: "text-yellow-500",
    [APIModerationActionType.Softban]: "text-yellow-500",
    [APIModerationActionType.ModifyRoles]: "text-blue-500",
    [APIModerationActionType.ClearMessages]: "text-blue-500",
    [APIModerationActionType.TemporaryBan]: "text-orange-500",
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
