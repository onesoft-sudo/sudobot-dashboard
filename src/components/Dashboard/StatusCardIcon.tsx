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

import { APIStatus } from "@/types/APIStatus";
import { ComponentProps, FC } from "react";
import {
    MdCancel,
    MdConstruction,
    MdOutlineErrorOutline,
    MdWarning,
    MdWarningAmber,
} from "react-icons/md";
import styles from "../../styles/StatusCardIcon.module.css";

interface StatusCardIconProps {
    status: APIStatus;
}

const iconProps: ComponentProps<typeof MdWarningAmber> = {
    size: 40,
};

const StatusCardIcon: FC<StatusCardIconProps> = ({ status }) => {
    switch (status) {
        case "operational":
            return <div className={`${styles.circle}`}></div>;

        case "major_outage":
            return (
                <MdOutlineErrorOutline
                    className="text-red-500"
                    {...iconProps}
                />
            );

        case "partial_outage":
            return <MdWarning className="text-red-400" {...iconProps} />;

        case "degraded":
            return <MdWarning className="text-orange-400" {...iconProps} />;

        case "maintenence":
            return <MdConstruction className="text-blue-500" {...iconProps} />;

        case "error":
            return <MdCancel className="text-red-500" {...iconProps} />;

        default:
            return <></>;
    }
};

export default StatusCardIcon;
