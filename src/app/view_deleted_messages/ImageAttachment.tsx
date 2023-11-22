"use client";

import { APIAttachment } from "@/types/APIAttachment";
import Image from "next/image";
import { FC, useState } from "react";
import { MdError } from "react-icons/md";

interface ImageAttachmentProps {
    attachment: APIAttachment;
}

const ImageAttachment: FC<ImageAttachmentProps> = ({ attachment }) => {
    const [isError, setIsError] = useState(false);

    return isError ? (
        <div
            style={{
                height: attachment.height ?? undefined,
                width: attachment.width ?? "100%",
                borderRadius: 10,
                background: "#111",
            }}
            className="flex items-center justify-center text-center p-3 text-red-400"
        >
            <MdError size={50} className="inline" />
            <span className="text-lg md:text-xl">
                &nbsp; This attachment is no longer available.
            </span>
        </div>
    ) : (
        <Image
            alt={attachment.name ?? "Unnamed Attachment"}
            src={attachment.attachment ?? attachment.proxyURL ?? attachment.url}
            style={{
                height: attachment.height ?? undefined,
                width: attachment.width ?? "100%",
                borderRadius: 10,
            }}
            layout={
                !attachment.height && !attachment.width ? "fill" : undefined
            }
            height={attachment.height == 0 ? undefined : attachment.height}
            width={attachment.width == 0 ? undefined : attachment.width}
            onError={() => setIsError(true)}
            onLoadingComplete={element => {
                if (element.naturalWidth === 0 || element.naturalHeight === 0) {
                    setIsError(true);
                }
            }}
        />
    );
};

export default ImageAttachment;
