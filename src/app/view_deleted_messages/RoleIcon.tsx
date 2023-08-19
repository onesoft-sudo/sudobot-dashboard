import { Tooltip } from "@mui/material";
import { FC } from "react";

interface RoleIconProps {
    iconURL: string;
    name: string;
}

const RoleIcon: FC<RoleIconProps> = ({ iconURL, name }) => {
    return (
        <Tooltip title={name}>
            <img
                src={iconURL}
                alt="Icon"
                height="18px"
                width="18px"
            />
        </Tooltip>
    );
};

export default RoleIcon;
