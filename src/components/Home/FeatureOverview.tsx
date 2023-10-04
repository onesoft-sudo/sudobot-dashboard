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

import { FC } from "react";
import HomeCards from "./HomeCards";

const FeatureOverview: FC = () => {
    return (
        <div className="px-5 md:px-[15%]">
            <h1 className="text-3xl md:text-4xl text-center pb-4">
                Why SudoBot?
            </h1>

            <div
                style={{
                    height: 2,
                    width: 50,
                    background: "#007bff",
                }}
                className="mx-auto mb-2"
            ></div>

            <br className="hidden md:block" />
            <br />

            <HomeCards />
        </div>
    );
};

export default FeatureOverview;
