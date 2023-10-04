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

import { FC, PropsWithChildren } from "react";
import { IconType } from "react-icons";

interface HomeCardProps extends PropsWithChildren {
    icon: IconType;
    title: string;
    paragraph?: boolean;
}

const HomeCard: FC<HomeCardProps> = ({
    icon: Icon,
    title,
    children,
    paragraph = true,
}) => {
    return (
        <div
            className="px-4 py-3 rounded-md"
            style={{
                background:
                    "linear-gradient(45deg, rgba(0, 123, 255, 0.1), rgba(0, 123, 255, 0.2))",
            }}
        >
            <div className="flex items-center gap-4 mb-3">
                <Icon
                    size={25}
                    color="#007bff"
                    style={{
                        marginTop: -2.5,
                    }}
                />
                <h2>{title}</h2>
            </div>

            <div>
                {paragraph ? (
                    <p className="text-[#999]">{children}</p>
                ) : (
                    children
                )}
            </div>
        </div>
    );
};

export default HomeCard;
