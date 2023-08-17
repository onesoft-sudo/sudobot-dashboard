import {
    APIPermissionMode,
    APIPermissionRole,
} from "@/types/APIPermissionRole";
import { FC } from "react";
import PermissionRole from "./PermissionRole";

interface PermissionRolesProps {
    permissions: APIPermissionRole[];
    mode: APIPermissionMode;
}

const PermissionRoles: FC<PermissionRolesProps> = ({ mode, permissions }) => {
    return (
        <div>
            {permissions.map(permission => (
                <PermissionRole
                    key={permission.id}
                    permission={permission}
                    mode={mode}
                />
            ))}
        </div>
    );
};

export default PermissionRoles;
