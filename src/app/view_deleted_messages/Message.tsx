import { APIDeletedMessage } from "@/types/APIMessage";
import { formatDistance } from "@/utils/utils";
import { FC } from "react";
import Avatar from "./Avatar";
import DisplayName from "./DisplayName";
import MessageContent from "./MessageContent";
import RoleIcon from "./RoleIcon";

interface MessageProps {
    message: APIDeletedMessage;
    systemAdmins?: string[];
}

const builtInSystemAdmins =
    process.env.NEXT_PUBLIC_SYSTEM_ADMINS?.split(/\s*,\s*/gi) ?? [];

const Message: FC<MessageProps> = ({
    message,
    systemAdmins = builtInSystemAdmins,
}) => {
    return (
        <div className="flex p-2 gap-3 md:gap-8 md:p-3 bg-[#222] my-2 rounded-md">
            <div className="w-[40px] md:w-[50px] min-w-[40px] max-w-[110px]">
                <Avatar
                    url={message.authorAvatarURL.replace(/\.gif$/, ".webp")}
                    animated={/\.gif$/.test(message.authorAvatarURL)}
                />
            </div>
            <div>
                <div className="flex items-baseline gap-3 pb-1">
                    <div
                        className="text-lg md:text-xl flex items-center gap-2"
                        style={{
                            color: message.authorColor
                                ? `#${message.authorColor.toString(16)}`
                                : "#fff",
                        }}
                    >
                        <DisplayName
                            username={message.author.username}
                            nickname={message.member.nickname}
                            hasRoleIcon={
                                !!(
                                    message.authorRoleIcon &&
                                    message.authorRoleName
                                )
                            }
                        />

                        {message.authorRoleIcon && message.authorRoleName && (
                            <RoleIcon
                                iconURL={message.authorRoleIcon}
                                name={message.authorRoleName}
                            />
                        )}

                        {message.author.bot && (
                            <div className="pl-[6px] pr-[5px] bg-[rgb(82,98,220)] text-white text-xs rounded-md">
                                BOT
                            </div>
                        )}

                        {!message.author.bot &&
                            systemAdmins.includes(message.author.id) && (
                                <div className="pl-[6px] pr-[5px] bg-[rgb(82,98,220)] text-white text-xs rounded-md">
                                    <span className="hidden md:inline">
                                        SYS
                                    </span>
                                    ADMIN
                                </div>
                            )}
                    </div>

                    <small className="text-[#999]">
                        {formatDistance(new Date(message.createdTimestamp))}
                    </small>
                </div>
                <MessageContent
                    content={message.content.replaceAll("\n", "\n\n")}
                    mentions={message.mentions}
                    guildId={message.guildId}
                />
            </div>
        </div>
    );
};

export default Message;
