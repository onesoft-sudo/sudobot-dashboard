"use client";

import Markdown from "@/components/Markdown/Markdown";
import { FC } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

interface MessageContentProps {
    content: string;
}

const MessageContent: FC<MessageContentProps> = ({ content }) => {
    return (
        <Markdown>
            <ReactMarkdown rehypePlugins={[remarkGfm as any, remarkBreaks]}>
                {content}
            </ReactMarkdown>
        </Markdown>
    );
};

export default MessageContent;
