import { APIPermissionRole } from "@/types/APIPermissionRole";
import { FC } from "react";
import PermissionRole from "./PermissionRole";

interface PermissionRolesProps {
    permissions: APIPermissionRole[];
}

const PermissionRoles: FC<PermissionRolesProps> = ({ permissions }) => {
    return (
        <div>
            {permissions.map(permission => (
                <PermissionRole key={permission.id} permission={permission} />
            ))}
        </div>
    );
};

export default PermissionRoles;
