"use client";

import SettingsForm from "@/components/Dashboard/SettingsForm";
import AntiRaidCard from "@/components/SettingCards/AntiRaidCard";
import AntiSpamCard from "@/components/SettingCards/AntiSpamCard";
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
                        <AntiSpamCard {...props} />
                        <AntiRaidCard {...props} />
                    </div>
                )}
            </SettingsForm>
        </div>
    );
};

export default CommandSettings;
