import { useDragControlsWithRef } from "@/hooks/dragging";
import { APIModerationAction } from "@/types/APIModerationAction";
import { Button } from "@mui/material";
import { Checkbox } from "@nextui-org/react";
import { Reorder } from "framer-motion";
import { type FC } from "react";
import { MdDragIndicator } from "react-icons/md";
import MessageRuleActionName from "./MessageRuleActionName";

type MessageRuleActionItemProps = {
    action: APIModerationAction;
    enabled: boolean;
    onChange?: (enabled: boolean) => void;
};

const MessageRuleActionItem: FC<MessageRuleActionItemProps> = ({ action, enabled, onChange }) => {
    const { controls, ref } = useDragControlsWithRef<HTMLButtonElement>();

    return (
        <Reorder.Item
            value={action}
            dragControls={controls}
            dragListener={false}
            className="flex items-center justify-between gap-3 rounded-lg bg-gray-100/80 p-2 dark:bg-[rgb(38,38,38)]"
        >
            <div className="flex items-center gap-2">
                <Button
                    ref={ref}
                    sx={{ minWidth: 0, cursor: "move" }}
                    disableTouchRipple
                    onPointerDown={(event) => controls.start(event)}
                >
                    <MdDragIndicator size="1.5rem" className="text-default-500" />
                </Button>
                <MessageRuleActionName action={action} />
            </div>

            <Checkbox isSelected={enabled} onValueChange={onChange} />
        </Reorder.Item>
    );
};

export default MessageRuleActionItem;
