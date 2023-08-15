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
