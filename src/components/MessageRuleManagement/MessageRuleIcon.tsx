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

    console.log(color.toString(16));

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
