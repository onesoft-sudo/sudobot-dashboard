import { APIAttachment } from "@/types/APIAttachment";
import { Tooltip } from "@mui/material";
import { FC } from "react";
import GenericAttachment from "./GenericAttachment";
import ImageAttachment from "./ImageAttachment";

interface AttachmentProps {
    attachment: APIAttachment;
}

const Attachment: FC<AttachmentProps> = ({ attachment }) => {
    return (
        <div className="my-2">
            {attachment.contentType.startsWith("image/") ? (
                <Tooltip title={attachment.name ?? "Unnamed Attachment"}>
                    <div
                        style={{
                            height: attachment.height,
                            width: attachment.width,
                        }}
                    >
                        <ImageAttachment attachment={attachment} />
                    </div>
                </Tooltip>
            ) : (
                <GenericAttachment attachment={attachment} />
            )}
        </div>
    );
};

export default Attachment;
