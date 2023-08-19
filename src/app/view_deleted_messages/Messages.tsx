import { APIDeletedMessage } from "@/types/APIMessage";
import { FC } from "react";
import Message from "./Message";

interface MessagesProps {
    messages: APIDeletedMessage[];
}

const Messages: FC<MessagesProps> = ({ messages }) => {
    const sortedMessages = [...messages].sort(
        (a, b) =>
            new Date(a.createdTimestamp).getTime() -
            new Date(b.createdTimestamp).getTime()
    );

    return (
        <div>
            {sortedMessages.map(message => (
                <Message key={message.id} message={message} />
            ))}
        </div>
    );
};

export default Messages;
