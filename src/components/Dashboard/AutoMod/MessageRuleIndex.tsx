import { type FC } from "react";

type MessageRuleIndexProps = {
    index: number | null;
};

const MessageRuleIndex: FC<MessageRuleIndexProps> = ({ index }) => {
    return (
        <div className="flex items-center justify-center rounded-lg bg-gray-100 p-2 text-lg font-bold dark:bg-[rgb(35,35,35)]">
            {index}
        </div>
    );
};

export default MessageRuleIndex;
