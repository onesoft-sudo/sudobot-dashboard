import { Chip, Tooltip } from "@nextui-org/react";
import { MdOutlineInvertColors } from "react-icons/md";

export default function MessageRuleModeInverted() {
    return (
        <Tooltip
            content={
                <span>
                    The rule will be triggered if the requirements{" "}
                    <strong className="font-semibold">do not match</strong>.
                </span>
            }
        >
            <Chip
                color="default"
                variant="flat"
                classNames={{
                    content: "flex items-center gap-1",
                }}
            >
                <MdOutlineInvertColors />
                Inverted
            </Chip>
        </Tooltip>
    );
}
