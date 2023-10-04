/*
* This file is part of SudoBot Dashboard.
*
* Copyright (C) 2021-2023 OSN Developers.
*
* SudoBot Dashboard is free software; you can redistribute it and/or modify it
* under the terms of the GNU Affero General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* SudoBot Dashboard is distributed in the hope that it will be useful, but
* WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU Affero General Public License for more details.
*
* You should have received a copy of the GNU Affero General Public License
* along with SudoBot Dashboard. If not, see <https://www.gnu.org/licenses/>.
*/

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
