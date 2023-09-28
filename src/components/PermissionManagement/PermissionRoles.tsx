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
            {permissions.length === 0 && (
                <p className="text-[#999]">None yet.</p>
            )}
        </div>
    );
};

export default PermissionRoles;
