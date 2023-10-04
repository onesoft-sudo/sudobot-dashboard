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
