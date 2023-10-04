/*
* This file is part of SudoBot Dashboard.
*
* Copyright (C) 2021-2023 OSN Developers.
*
* SudoBot Dashboard is free software; you can redistribute it and/or modify it
* under the terms of the GNU Affero General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* SudoBot Dashboard is distributed in the hope that it will be useful, but
* WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU Affero General Public License for more details.
*
* You should have received a copy of the GNU Affero General Public License
* along with SudoBot Dashboard. If not, see <https://www.gnu.org/licenses/>.
*/

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
