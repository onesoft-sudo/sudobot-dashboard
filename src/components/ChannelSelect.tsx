import { MenuItem, TextField, TextFieldProps } from "@mui/material";
import { FaHashtag } from "react-icons/fa";
import { MdAnnouncement, MdCampaign, MdFolder } from "react-icons/md";

type ChannelSelectProps = TextFieldProps & {
    data: Array<any>;
    channelTypes?: Array<"GUILD_TEXT" | "GUILD_NEWS" | "GUILD_CATEGORY">;
};

export default function ChannelSelect({
    data = [],
    channelTypes = ["GUILD_TEXT", "GUILD_NEWS"],
    ...props
}: ChannelSelectProps) {
    return (
        <TextField select {...props}>
            {data.map((channel: any) =>
                channelTypes.includes(channel.type) ? (
                    <MenuItem key={channel.id} value={channel.id}>
                        {channel.type === "GUILD_TEXT" ? (
                            <FaHashtag />
                        ) : channel.type === "GUILD_NEWS" ? (
                            <MdCampaign className="mr-2" />
                        ) : channel.type === "GUILD_CATEGORY" ? (
                            <MdFolder className="mr-2" />
                        ) : null}
                        {channel.name}
                    </MenuItem>
                ) : null
            )}
        </TextField>
    );
}
