"use client";

import SettingsForm from "@/components/Dashboard/SettingsForm";
import PermissionRoleCreateModal from "@/components/PermissionManaging/PermissionRoleCreateModal";
import PermissionRoleList from "@/components/PermissionManaging/PermissionRoleList";
import PermissionModeCard from "@/components/SettingCards/PermissionModeCard";
import useAuthWithCheck from "@/hooks/useAuthWithCheck";
import { Dispatch, FC, SetStateAction, useRef } from "react";

const PermissionSettings: FC = () => {
    useAuthWithCheck();
    const ref = useRef<Dispatch<SetStateAction<boolean>>>(() => null);

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <div className="pt-4 md:mr-4 px-3 md:px-0 mt-6">
            <PermissionRoleCreateModal
                onMount={setOpen => {
                    ref.current = setOpen;
                }}
            />

            <SettingsForm className="px-0" buttons={true} onSubmit={onSubmit}>
                {props => (
                    <div className="grid grid-cols-1 md:grid-cols-2 pt-4 gap-5">
                        <PermissionModeCard {...props} />

                        <PermissionRoleList
                            setCreating={ref.current}
                            {...props}
                        />
                    </div>
                )}
            </SettingsForm>
        </div>
    );
};

export default PermissionSettings;
