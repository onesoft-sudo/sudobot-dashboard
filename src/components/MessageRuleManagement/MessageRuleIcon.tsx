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
import { ComponentProps, FC } from "react";
import { IconType } from "react-icons";
import { FaFile, FaGlobe } from "react-icons/fa6";
import {
    MdEmail,
    MdFileCopy,
    MdLink,
    MdOutlinePattern,
    MdPattern,
    MdShortText,
} from "react-icons/md";

type Type = APIMessageRule["type"];

interface MessageRuleIconProps extends ComponentProps<IconType> {
    type: Type;
}

const icons: Record<Type, IconType> = {
    anti_invite: MdLink,
    block_mass_mention: MdEmail,
    block_repeated_text: MdShortText,
    blocked_file_extension: MdFileCopy,
    blocked_mime_type: FaFile,
    domain: FaGlobe,
    regex_filter: MdPattern,
    regex_must_match: MdOutlinePattern,
};

const MessageRuleIcon: FC<MessageRuleIconProps> = ({ type, ...props }) => {
    const Icon = icons[type];
    const color = 0x0000ff * type.length;

    return (
        <Icon
            className="p-1 rounded-lg [border:1px_solid]"
            style={{
                borderColor: `#${color.toString(16)}`,
                color: `#${color.toString(16)}`,
            }}
            {...props}
        />
    );
};

export default MessageRuleIcon;
