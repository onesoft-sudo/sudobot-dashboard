"use client";

import { APIAttachment } from "@/types/APIAttachment";
import { formatSize } from "@/utils/utils";
import { FC, useState } from "react";
import { MdDownload, MdFileOpen } from "react-icons/md";

interface GenericAttachmentProps {
    attachment: APIAttachment;
}

const GenericAttachment: FC<GenericAttachmentProps> = ({ attachment }) => {
    const [mouseEntered, hasMouseEntered] = useState(false);

    return (
        <div
            onMouseEnter={() => hasMouseEntered(true)}
            onMouseLeave={() => hasMouseEntered(false)}
            className="w-[100%] md:w-[200px] lg:w-[300px] grid grid-cols-[1fr_5fr] gap-3 bg-[#111] rounded-md p-3 relative"
        >
            {mouseEntered && (
                <a
                    href={
                        attachment.attachment ??
                        attachment.url ??
                        attachment.proxyURL
                    }
                    title={attachment.name}
                    target="_blank"
                    className="[transform:translate(50%,-50%)] bg-[#111] hover:bg-[#222] absolute top-0 right-0 h-[2em] w-[2em] p-1 rounded-lg [box-shadow:0_0_1px_0_#777] flex justify-center items-center"
                >
                    <MdDownload size={25} />
                </a>
            )}
            <div className="flex justify-center items-center">
                <MdFileOpen size={30} />
            </div>
            <div className="block gap-2">
                <a
                    href={
                        attachment.attachment ??
                        attachment.url ??
                        attachment.proxyURL
                    }
                    title={attachment.name}
                    className="text-sm link"
                    target="_blank"
                >
                    {attachment.name}
                </a>
                <span className="text-xs text-[#999] block">
                    {formatSize(attachment.size)}
                </span>
            </div>
        </div>
    );
};

export default GenericAttachment;
