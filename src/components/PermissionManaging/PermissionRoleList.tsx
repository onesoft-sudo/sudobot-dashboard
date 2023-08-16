import { APIPermissionRole } from "@/types/APIPermissionRole";
import { SettingCardProps } from "@/types/SetttingCardProps";
import { Button, Card, CardBody, CardHeader, Tooltip } from "@nextui-org/react";
import { FC } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { MdOutlineKey, MdSecurity } from "react-icons/md";

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
            roles: [],
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

const PermissionRoleList: FC<SettingCardProps> = ({}) => {
    const permissions = [...apiPermissionRoles.permissions].sort((a, b) =>
        apiPermissionRoles.mode === "levels"
            ? (b.level ?? 0) - (a.level ?? 0)
            : (b.name ?? "Z").charCodeAt(0) - (a.name ?? "Z").charCodeAt(0)
    );

    return (
        <Card>
            <CardHeader>
                <h4 className="font-bold text-large pl-2">Permission Roles</h4>
            </CardHeader>

            <CardBody>
                {permissions.map(permission => (
                    <div
                        style={{
                            background: "#232323",
                            padding: "10px 10px 10px 12px",
                            margin: 10,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                        key={permission.id}
                    >
                        <div className="flex items-center">
                            <Tooltip
                                content={
                                    permission.level !== undefined
                                        ? "This is a permission level."
                                        : "This is a named permission role."
                                }
                                delay={1200}
                                color="foreground"
                            >
                                <div>
                                    {permission.level !== undefined ? (
                                        <MdSecurity size={20} />
                                    ) : (
                                        <MdOutlineKey size={20} />
                                    )}
                                </div>
                            </Tooltip>
                            <h3 className="ml-2">{permission.name}</h3>
                            {permission.level !== undefined && (
                                <h4 className="ml-5 text-sm text-[#999]">
                                    {permission.level}
                                </h4>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <Button variant="flat" radius="sm" isIconOnly>
                                <FaChevronDown size={15} />
                            </Button>
                        </div>
                    </div>
                ))}
            </CardBody>
        </Card>
    );
};

export default PermissionRoleList;
