"use client";

import { getPermissionRoles } from "@/api/permissionRoles";
import { useAuthContext } from "@/contexts/AuthContext";
import { SettingCardProps } from "@/types/SetttingCardProps";
import { Button } from "@mui/material";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, FC, SetStateAction } from "react";
import { MdAdd } from "react-icons/md";
import Loading from "../Loading/Loading";
import PermissionRoles from "./PermissionRoles";

const PermissionRoleList: FC<
    SettingCardProps & { setCreating: Dispatch<SetStateAction<boolean>> }
> = ({ data: { config }, setCreating }) => {
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
        <>
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center w-[100%]">
                        <h4 className="font-bold text-large pl-2">
                            Permission Roles
                        </h4>
                        <div>
                            {config?.permissions?.mode === "advanced" &&
                                !!user &&
                                !!currentGuild && (
                                    <Button
                                        onClick={() => setCreating(true)}
                                        startIcon={<MdAdd />}
                                    >
                                        Create
                                    </Button>
                                )}
                        </div>
                    </div>
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
        </>
    );
};

export default PermissionRoleList;
