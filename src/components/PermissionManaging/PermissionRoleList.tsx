import { APIPermissionRole } from "@/types/APIPermissionRole";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { FC } from "react";
import PermissionRoles from "./PermissionRoles";

type APIResponse = {
    permissions: APIPermissionRole[];
    mode: "levels" | "discord" | "advanced";
};

const apiPermissionRoles: APIResponse = {
    mode: "levels",
    permissions: [
        {
            id: 1,
            level: 0,
            name: "Member",
            permissions: ["SendMessages"],
            roles: [
                {
                    name: "als",
                    id: "2757566586637",
                },
            ],
            users: [],
        },
        {
            id: 2,
            level: 50,
            name: "Moderator",
            permissions: ["KickMembers", "BanMembers"],
            roles: [],
            users: [],
        },
        {
            id: 3,
            level: 75,
            name: "Admin",
            permissions: ["ManageGuild"],
            roles: [],
            users: [],
        },
        {
            id: 6,
            level: undefined,
            name: "Booster",
            permissions: ["ManageRoles"],
            roles: [],
            users: [],
        },
        {
            id: 4,
            level: 100,
            name: "Sr. Admin",
            permissions: ["Administrator"],
            roles: [],
            users: [],
        },
    ],
};

const permissions = [...apiPermissionRoles.permissions].sort(
    (a, b) => (a.name ?? "Z").charCodeAt(0) - (b.name ?? "Z").charCodeAt(0)
);

const PermissionRoleList: FC = ({}) => {
    return (
        <Card>
            <CardHeader>
                <h4 className="font-bold text-large pl-2">Permission Roles</h4>
            </CardHeader>

            <CardBody>
                <PermissionRoles
                    permissions={permissions}
                    mode={apiPermissionRoles.mode}
                />
            </CardBody>
        </Card>
    );
};

export default PermissionRoleList;
