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

import { patchPermissionRole } from "@/api/permissionRoles";
import { useAuthContext } from "@/contexts/AuthContext";
import { APIPermissionRole } from "@/types/APIPermissionRole";
import { Alert } from "@mui/material";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { useForm } from "react-hook-form";
import PermissionRoleFormSelect from "./PermissionRoleFormSelect";

interface PermissionRoleEditFormProps {
    permission: APIPermissionRole;
    onEnd?: () => any;
}

const PermissionRoleEditForm: FC<PermissionRoleEditFormProps> = ({
    permission,
    onEnd,
}) => {
    const key = `permission_${permission.id}`;
    const {
        formState: { errors },
        handleSubmit,
        register,
        reset,
        resetField,
    } = useForm({
        defaultValues: {
            [`${key}__name`]: permission.name,
            [`${key}__permissions`]: permission.grantedPermissions ?? [],
        },
    });
    const { user } = useAuthContext();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ["permission_role", permission.guild_id, permission.id],
        mutationFn: (data: any) =>
            patchPermissionRole({
                guildId: permission.guild_id,
                id: permission.id,
                payload: data as any,
                token: user?.token ?? "",
            }),
        onSuccess(data) {
            console.log(data);
            queryClient.invalidateQueries([
                "permission_roles",
                permission.guild_id,
            ]);
            onEnd?.();
        },
        onError(error) {
            console.error(error);
        },
    });

    const onSuccess = (data: any) => {
        const processedData = {} as any;

        for (const objKey in data) {
            processedData[objKey.replace(`${key}__`, "")] = data[objKey];
        }

        console.log(processedData);

        processedData.permissions =
            processedData.permissions === ""
                ? []
                : (typeof processedData.permissions === "string"
                      ? processedData.permissions?.split(",")
                      : processedData.permissions) ?? [];
        processedData.users =
            processedData.users === ""
                ? []
                : processedData.users?.split(/(,|\s)+/) ?? [];
        processedData.roles =
            processedData.roles === ""
                ? []
                : processedData.roles?.split(/(,|\s)+/) ?? [];

        mutation.mutate(processedData);
    };

    return (
        <form noValidate onSubmit={handleSubmit(onSuccess)}>
            {mutation.isError && (
                <>
                    <Alert severity="error">
                        An error has occurred while updating this permission
                        role.
                    </Alert>
                    <div className="py-2"></div>
                </>
            )}

            <Input
                type="text"
                label="Name"
                defaultValue={permission.name}
                {...register(`${key}__name`, {
                    required: {
                        message:
                            "You must specify a name for this permission role!",
                        value: true,
                    },
                })}
            />

            <div className="py-2 text-xs text-red-600">
                {errors?.[`${key}__name`]?.message}
            </div>

            <PermissionRoleFormSelect
                fieldName={`${key}__permissions`}
                register={register}
                resetField={resetField}
                defaultValue={permission.grantedPermissions ?? []}
            />

            <div className="py-2"></div>

            <Textarea
                type="text"
                label="Users"
                minRows={2}
                placeholder="Add a User ID"
                defaultValue={
                    permission.users?.map(({ id }) => id).join("\n") ?? ""
                }
                {...register(`${key}__users`, {
                    validate(input) {
                        return /^([0-9,\s])*$/.test(input?.toString() ?? "")
                            ? undefined
                            : "The User IDs are invalid!";
                    },
                })}
            />

            <div className="py-2 text-xs text-red-600">
                {errors?.[`${key}__users`]?.message}
            </div>

            <Textarea
                type="text"
                label="Roles"
                minRows={2}
                placeholder="Add a Role ID"
                defaultValue={
                    permission.roles?.map(({ id }) => id).join("\n") ?? ""
                }
                {...register(`${key}__roles`, {
                    validate(input) {
                        return /^([0-9,\s])*$/.test(input?.toString() ?? "")
                            ? undefined
                            : "The Role IDs are invalid!";
                    },
                })}
            />
            <div className="py-2 text-xs text-red-600">
                {errors?.[`${key}__roles`]?.message}
            </div>

            <div className="pb-2 text-xs">
                IDs should be seperated by spaces, new lines or commas (
                <span className="text-mono px-1 bg-[#333]">,</span>).
                <br />
                Confused how to find User ID or Role IDs? See{" "}
                <a
                    href="https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-"
                    target="_blank"
                    className="link"
                >
                    Where can I find my User/Server/Message ID?
                </a>
            </div>

            <div className="flex justify-end items-center gap-3 pt-3">
                <Button
                    color="danger"
                    variant="flat"
                    type="reset"
                    onClick={() => {
                        reset();
                        onEnd?.();
                    }}
                    disabled={mutation.isLoading}
                >
                    Cancel
                </Button>
                <Button
                    color="primary"
                    variant="flat"
                    type="submit"
                    isLoading={mutation.isLoading}
                >
                    {mutation.isLoading ? "Saving..." : "Save"}
                </Button>
            </div>
        </form>
    );
};

export default PermissionRoleEditForm;
