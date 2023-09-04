"use client";

import SettingsForm from "@/components/Dashboard/SettingsForm";
import PermissionRoleCreateModal from "@/components/PermissionManaging/PermissionRoleCreateModal";
import PermissionRoleList from "@/components/PermissionManaging/PermissionRoleList";
import useAuthWithCheck from "@/hooks/useAuthWithCheck";
import { Dispatch, FC, SetStateAction, useRef } from "react";

const PermissionSettings: FC = () => {
    useAuthWithCheck();
    const ref = useRef<Dispatch<SetStateAction<boolean>>>(() => null);

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 pt-4 gap-5 md:mr-4 px-3 md:px-0 mt-6">
            <PermissionRoleCreateModal
                onMount={setOpen => {
                    ref.current = setOpen;
                }}
            />

            <SettingsForm className="px-0" buttons={false} onSubmit={onSubmit}>
                {props => (
                    <div className="mt-5">
                        <PermissionRoleList
                            setCreating={ref.current}
                            {...props}
                        />

                        <div></div>
                    </div>
                )}
            </SettingsForm>
        </div>
    );
};

export default PermissionSettings;
