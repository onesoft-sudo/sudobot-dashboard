import { APIMessage } from "@/types/APIMessage";
import { formatDistance } from "@/utils/utils";
import { FC } from "react";
import Avatar from "./Avatar";
import DisplayName from "./DisplayName";
import MessageContent from "./MessageContent";
import RoleIcon from "./RoleIcon";

interface MessageProps {
    message: APIMessage;
}

const Message: FC<MessageProps> = ({ message }) => {
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
                    </div>

                    <small className="text-[#999]">
                        {formatDistance(new Date(message.createdTimestamp))}
                    </small>
                </div>
                <MessageContent
                    content={message.content.replaceAll("\n", "\n\n")}
                />
            </div>
        </div>
    );
};

export default Message;
