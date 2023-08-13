"use client";

import SettingsForm from "@/components/Dashboard/SettingsForm";
import DiscordCommandsCard from "@/components/SettingCards/DiscordCommandsCard";
import PrefixCard from "@/components/SettingCards/PrefixCard";
import { FC } from "react";

const CommandSettings: FC = () => {
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
