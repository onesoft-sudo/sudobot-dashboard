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

import useAuthWithCheck from "@/hooks/useAuthWithCheck";
import { FC } from "react";

const Welcome: FC = () => {
    const { user } = useAuthWithCheck();

    if (!user) {
        return <></>;
    }

    return (
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-center pt-7 px-3 md:px-0">
            Welcome to The Control Panel,{" "}
            <span className="text-blue-600">
                {user?.name ? user?.name.split(/\s+/)[0] : user?.username}
            </span>
            !
        </h1>
    );
};

export default Welcome;
