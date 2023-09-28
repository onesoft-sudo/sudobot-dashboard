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
