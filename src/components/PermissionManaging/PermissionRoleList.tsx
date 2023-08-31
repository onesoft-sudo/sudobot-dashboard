"use client";

import { getPermissionRoles } from "@/api/permissionRoles";
import { useAuthContext } from "@/contexts/AuthContext";
import { SettingCardProps } from "@/types/SetttingCardProps";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import Loading from "../Loading/Loading";
import PermissionRoles from "./PermissionRoles";

const PermissionRoleList: FC<SettingCardProps> = ({ data: { config } }) => {
    const { user, currentGuild } = useAuthContext();
    const query = useQuery({
        enabled:
            config?.permissions?.mode === "advanced" &&
            !!user &&
            !!currentGuild,
        queryKey: ["permission_roles", currentGuild?.id],
        queryFn: () =>
            getPermissionRoles({
                guildId: currentGuild!.id,
                token: user!.token,
            }),
    });

    return (
        <Card>
            <CardHeader>
                <h4 className="font-bold text-large pl-2">Permission Roles</h4>
            </CardHeader>

            <CardBody>
                {config?.permissions?.mode === "advanced" ? (
                    <>
                        {query.isLoading && <Loading />}
                        {query.isSuccess && (
                            <PermissionRoles
                                permissions={query.data?.data ?? []}
                            />
                        )}{" "}
                    </>
                ) : (
                    <p className="text-[#999]">
                        Named permission roles aren&rsquo;t enabled in this
                        server.
                    </p>
                )}
            </CardBody>
        </Card>
    );
};

export default PermissionRoleList;
