import { Chip, Tooltip } from "@nextui-org/react";
import { MdPanTool } from "react-icons/md";

export default function MessageRuleBail() {
    return (
        <Tooltip content={<span>If this rule is triggered, no further rules will be checked.</span>}>
            <Chip
                color="primary"
                variant="flat"
                classNames={{
                    content: "flex items-center gap-1",
                }}
            >
                <MdPanTool />
                <span className="hidden md:block">Bail</span>
            </Chip>
        </Tooltip>
    );
}
