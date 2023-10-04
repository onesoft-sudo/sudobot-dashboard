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
import { FC } from "react";
import Message from "./Message";

interface MessagesProps {
    messages: APIDeletedMessage[];
}

const Messages: FC<MessagesProps> = ({ messages }) => {
    const sortedMessages = [...messages].sort(
        (a, b) =>
            new Date(a.createdTimestamp).getTime() -
            new Date(b.createdTimestamp).getTime()
    );

    return (
        <div>
            {sortedMessages.map(message => (
                <Message key={message.id} message={message} />
            ))}
        </div>
    );
};

export default Messages;
