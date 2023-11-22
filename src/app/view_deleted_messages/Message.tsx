/*
 * This file is part of SudoBot Dashboard.
 *
 * Copyright (C) 2021-2023 OSN Developers.
 *
 * SudoBot Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * SudoBot Dashboard is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with SudoBot Dashboard. If not, see <https://www.gnu.org/licenses/>.
 */

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
    const authorColorString = message.authorColor?.toString(16);
    const authorColorHexString =
        message.authorColor === 0
            ? "#fff"
            : authorColorString
            ? `#${authorColorString.padStart(6, "0")}`
            : null;

    return (
        <div className="flex p-2 gap-3 md:gap-5 md:p-3 bg-[#222] my-2 rounded-md">
            <div className="w-[40px] md:w-[50px] min-w-[40px] max-w-[110px]">
                <Avatar
                    url={message.authorAvatarURL.replace(/\.gif$/, ".webp")}
                    animated={/\.gif$/.test(message.authorAvatarURL)}
                />
            </div>
            <div className="relative basis-[99%]">
                <div className="flex items-baseline gap-3 pb-1">
                    <div
                        className="text-lg md:text-xl flex items-center gap-2"
                        style={{
                            color: authorColorHexString ?? "#fff",
                        }}
                    >
                        <DisplayName
                            username={message.author.username}
                            nickname={message.member?.nickname}
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
