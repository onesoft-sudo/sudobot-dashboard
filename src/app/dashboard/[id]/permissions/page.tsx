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
        <div className="grid grid-cols-1 lg:grid-cols-2 pt-4 gap-5 md:mr-4 px-3 md:px-0 mt-6">
            <SettingsForm className="px-0" buttons={false} onSubmit={onSubmit}>
                {props => (
                    <div className="mt-5">
                        <PermissionRoleList {...props} />

                        <div></div>
                    </div>
                )}
            </SettingsForm>
        </div>
    );
};

export default PermissionSettings;
