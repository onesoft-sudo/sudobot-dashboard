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

import SettingsForm from "@/components/Dashboard/SettingsForm";
import DiscordCommandsCard from "@/components/SettingCards/DiscordCommandsCard";
import PrefixCard from "@/components/SettingCards/PrefixCard";
import useAuthWithCheck from "@/hooks/useAuthWithCheck";
import { FC } from "react";

const CommandSettings: FC = () => {
    useAuthWithCheck();

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <div>
            <SettingsForm onSubmit={onSubmit}>
                {props => (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-4 gap-5">
                        <PrefixCard {...props} />
                        <DiscordCommandsCard {...props} />
                    </div>
                )}
            </SettingsForm>
        </div>
    );
};

export default CommandSettings;
