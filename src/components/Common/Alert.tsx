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

import { ComponentProps, FC, PropsWithChildren } from "react";
import { IconType } from "react-icons";
import { MdCheck, MdError, MdInfo, MdWarning } from "react-icons/md";

interface AlertProps extends PropsWithChildren, ComponentProps<"div"> {
    type?: "info" | "success" | "error" | "warning";
    icon?: IconType;
    className?: string;
}

const Alert: FC<AlertProps> = ({
    children,
    icon,
    type = "success",
    className = "",
    ...props
}) => {
    const Icon =
        icon ??
        (type === "success"
            ? MdCheck
            : type === "error"
            ? MdError
            : type === "info"
            ? MdInfo
            : type === "warning"
            ? MdWarning
            : MdCheck);

    const colorClass =
        type === "success"
            ? "bg-green-500"
            : type === "error"
            ? "bg-red-600"
            : type === "info"
            ? "bg-blue-600"
            : type === "warning"
            ? "bg-yellow-600"
            : "bg-green-500";

    return (
        <div
            className={`${colorClass} flex gap-5 items-center p-3 rounded-md mb-4 ${className}`}
            {...props}
        >
            <Icon size={20} />
            <p>{children}</p>
        </div>
    );
};

export default Alert;
