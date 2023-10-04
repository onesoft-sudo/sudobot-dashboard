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
import { IconButton } from "@mui/material";
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react";
import { FC } from "react";
import { MdDelete, MdEdit, MdMoreVert } from "react-icons/md";
import Switch from "../Common/Switch";
import MessageRuleIcon from "./MessageRuleIcon";
import MessageRuleName from "./MessageRuleName";

interface MessageRuleProps {
    rule: APIMessageRule;
}

const MessageRule: FC<MessageRuleProps> = ({ rule }) => {
    return (
        <div className="flex justify-between items-center text-lg py-2 my-1 hover:bg-[#333] px-3 rounded cursor-pointer">
            <div className="gap-3 flex items-center">
                <MessageRuleIcon size={30} type={rule.type} />
                <div>
                    <MessageRuleName type={rule.type} />
                </div>
            </div>
            <div className="flex items-center">
                <div>
                    <Switch defaultChecked={true} onChange={() => null} />
                </div>
                <Dropdown>
                    <DropdownTrigger>
                        <IconButton size="small" disableFocusRipple>
                            <MdMoreVert />
                        </IconButton>
                    </DropdownTrigger>
                    <DropdownMenu variant="flat" aria-label="Static Actions">
                        <DropdownItem key="edit" startContent={<MdEdit />}>
                            Edit
                        </DropdownItem>
                        <DropdownItem
                            key="delete"
                            className="text-danger"
                            color="danger"
                            startContent={<MdDelete />}
                        >
                            Delete
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    );
};

export default MessageRule;
