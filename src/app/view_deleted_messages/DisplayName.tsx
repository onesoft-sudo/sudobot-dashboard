"use client";

import { Tooltip } from "@mui/material";
import { FC } from "react";

interface DisplayNameProps {
    name?: string;
    username: string;
    nickname?: string;
    hasRoleIcon?: boolean;
}

const DisplayName: FC<DisplayNameProps> = ({ name, username, nickname }) => {
    const displayName = name ?? nickname ?? username;

    return (
        <Tooltip title={displayName}>
            <span className="overflow-ellipsis overflow-hidden w-[100%] whitespace-nowrap">
                {displayName}
            </span>
        </Tooltip>
    );
};

export default DisplayName;
