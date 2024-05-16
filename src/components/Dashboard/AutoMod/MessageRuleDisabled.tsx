import { Chip, Tooltip } from "@nextui-org/react";
import { MdClose } from "react-icons/md";

export default function MessageRuleDisabled() {
    return (
        <Tooltip content={<span>This rule is disabled and will not be triggered.</span>}>
            <Chip
                color="danger"
                variant="flat"
                classNames={{
                    content: "flex items-center gap-1",
                }}
            >
                <MdClose />
                <span className="hidden md:block">Disabled</span>
            </Chip>
        </Tooltip>
    );
}
