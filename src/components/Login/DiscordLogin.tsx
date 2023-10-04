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

import useSessionStorage from "@/hooks/useSessionStorage";
import { DISCORD_OAUTH_URL } from "@/utils/links";
import { Button } from "@nextui-org/react";
import { FC } from "react";
import { FaDiscord } from "react-icons/fa6";

interface DiscordLoginProps {
    isDisabled?: boolean;
    label?: string;
}

const generateRandomState = () => {
    let str = "";

    for (let i = 0; i < 32; i++) {
        str += Math.floor(Math.random() * 16).toString(16);
    }

    return str;
};

const DiscordLogin: FC<DiscordLoginProps> = ({ isDisabled, label }) => {
    const [oauthState, updateOauthState] = useSessionStorage(
        "discord_oauth_state"
    );

    const onLoginAttempt = () => {
        const state = generateRandomState();
        const url = `${DISCORD_OAUTH_URL}&state=${encodeURIComponent(state)}`;
        updateOauthState(state);
        location.assign(url);
    };

    return (
        <div>
            <Button
                type="button"
                fullWidth
                color="primary"
                variant="flat"
                isDisabled={isDisabled}
                startContent={<FaDiscord size={20} />}
                onClick={onLoginAttempt}
            >
                {label ?? "Login with Discord"}
            </Button>
        </div>
    );
};

export default DiscordLogin;
