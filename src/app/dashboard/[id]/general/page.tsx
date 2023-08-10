"use client";

import SettingsForm from "@/components/Dashboard/SettingsForm";
import PrefixCard from "@/components/SettingCards/PrefixCard";
import { FC } from "react";

const GeneralSettings: FC = () => {
    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <div>
            <SettingsForm onSubmit={onSubmit}>
                {({ register, errors }) => (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-4">
                        <PrefixCard register={register} errors={errors} />
                    </div>
                )}
            </SettingsForm>
        </div>
    );
};

export default GeneralSettings;
