import { APIDeletedMessage } from "@/types/APIMessage";
import { FC } from "react";
import Message from "./Message";

interface MessagesProps {
    messages: APIDeletedMessage[];
}

const Messages: FC<MessagesProps> = ({ messages }) => {
    return (
        <div>
            {messages.map(message => (
                <Message key={message.id} message={message} />
            ))}
        </div>
    );
};

export default Messages;
