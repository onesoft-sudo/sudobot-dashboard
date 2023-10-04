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

import { APIMessageRule } from "@/types/APIMessageRule";
import { FC } from "react";

type Type = APIMessageRule["type"];

interface MessageRuleIconProps {
    type: Type;
}

const names: Record<Type, string> = {
    anti_invite: "Anti Invite",
    block_mass_mention: "Block Mass Mention",
    block_repeated_text: "Block Repeated Text",
    blocked_file_extension: "Block File with Specific Extensions",
    blocked_mime_type: "Block Specific File Types",
    domain: "Block Domains",
    regex_filter: "Regex (Block)",
    regex_must_match: "Regex (Must match)",
};

const MessageRuleName: FC<MessageRuleIconProps> = ({ type }) => {
    return names[type];
};

export default MessageRuleName;
