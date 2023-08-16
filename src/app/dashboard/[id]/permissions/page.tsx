"use client";

import SettingsForm from "@/components/Dashboard/SettingsForm";
import PermissionRoleList from "@/components/PermissionManaging/PermissionRoleList";
import useAuthWithCheck from "@/hooks/useAuthWithCheck";
import { FC } from "react";

const PermissionSettings: FC = () => {
    useAuthWithCheck();

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <div>
            <SettingsForm onSubmit={onSubmit}>
                {props => (
                    <div className="grid grid-cols-1 lg:grid-cols-2 pt-4 gap-5 mr-4">
                        <PermissionRoleList {...props} />
                    </div>
                )}
            </SettingsForm>
        </div>
    );
};

export default PermissionSettings;
