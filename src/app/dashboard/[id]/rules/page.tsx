"use client";

import SettingsForm from "@/components/Dashboard/SettingsForm";
import MessageRuleCard from "@/components/MessageRuleManagement/MessageRuleCard";
import useAuthWithCheck from "@/hooks/useAuthWithCheck";
import { FC } from "react";

const MessageRuleSettings: FC = () => {
    useAuthWithCheck();

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <div>
            <SettingsForm onSubmit={onSubmit}>
                {props => (
                    <div className="grid grid-cols-1 lg:grid-cols-2 pt-4 gap-5">
                        <MessageRuleCard {...props} />
                    </div>
                )}
            </SettingsForm>
        </div>
    );
};

export default MessageRuleSettings;
