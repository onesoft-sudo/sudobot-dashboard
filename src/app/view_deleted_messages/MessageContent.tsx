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

"use client";

import Markdown from "@/components/Markdown/Markdown";
import { APIDeletedMessageMentions } from "@/types/APIDeletedMessageMentions";
import { FC } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

interface MessageContentProps {
    content: string;
    mentions: APIDeletedMessageMentions;
    guildId: string;
}

const MessageContent: FC<MessageContentProps> = ({
    content,
    mentions,
    guildId,
}) => {
    return (
        <Markdown>
            <ReactMarkdown rehypePlugins={[remarkGfm as any, remarkBreaks]}>
                {content
                    .replace(/<@(!)?\d+>/gim, matchedString => {
                        const id = matchedString.substring(
                            matchedString.includes("!") ? 3 : 2,
                            matchedString.length - 1
                        );
                        const name =
                            mentions.members?.find(m => m.id === id)
                                ?.nickname ??
                            mentions.users.find(u => u.id === id)?.username;
                        return `[${
                            name ? `@${name}` : `<@${id}>`
                        }](https://discord.com/users/${encodeURIComponent(
                            id
                        )})`;
                    })
                    .replace(/<@&?\d+>/gim, matchedString => {
                        const id = matchedString.substring(
                            3,
                            matchedString.length - 1
                        );

                        const name = mentions.roles.find(
                            m => m.id === id
                        )?.name;

                        return `[${name ? `@${name}` : `@deleted-role`}](#)`;
                    })
                    .replace(/<#\d+>/gim, matchedString => {
                        const id = matchedString.substring(
                            2,
                            matchedString.length - 1
                        );

                        const name = mentions.channels.find(
                            m => m.id === id
                        )?.name;

                        return `[#${
                            name ? `${name}` : `deleted-channel`
                        }](https://discord.com/channels/${encodeURIComponent(
                            guildId
                        )}/${encodeURIComponent(id)})`;
                    })}
            </ReactMarkdown>
        </Markdown>
    );
};

export default MessageContent;
