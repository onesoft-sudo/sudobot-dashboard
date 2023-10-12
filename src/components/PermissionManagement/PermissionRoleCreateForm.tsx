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

import { createPermissionRole } from "@/api/routes/permissionRoles";
import { useAuthContext } from "@/contexts/AuthContext";
import { Alert } from "@mui/material";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { useForm } from "react-hook-form";
import PermissionRoleFormSelect from "./PermissionRoleFormSelect";

interface PermissionRoleCreateFormProps {
    onEnd?: () => any;
}

const PermissionRoleCreateForm: FC<PermissionRoleCreateFormProps> = ({
    onEnd,
}) => {
    const {
        formState: { errors },
        handleSubmit,
        register,
        reset,
        resetField,
    } = useForm();
    const { user, currentGuild } = useAuthContext();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ["permission_role_create"],
        mutationFn: (data: any) =>
            createPermissionRole({
                guildId: currentGuild?.id ?? "",
                payload: data as any,
                token: user?.token ?? "",
            }),
        onSuccess(data) {
            console.log(data);
            queryClient.invalidateQueries([
                "permission_roles",
                currentGuild?.id ?? "",
            ]);
            onEnd?.();
        },
        onError(error) {
            console.error(error);
        },
    });

    const onSuccess = (data: any) => {
        const processedData = data;

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
                        An error has occurred while creating the permission
                        role.
                    </Alert>
                    <div className="py-2"></div>
                </>
            )}

            <Input
                type="text"
                label="Name"
                {...register(`name`, {
                    required: {
                        message:
                            "You must specify a name for this permission role!",
                        value: true,
                    },
                })}
            />

            <div className="py-2 text-xs text-red-600">
                {errors?.name?.message?.toString()}
            </div>

            <PermissionRoleFormSelect
                fieldName={`permissions`}
                register={register}
                resetField={resetField}
                defaultValue={[]}
            />

            <div className="py-2"></div>

            <Textarea
                type="text"
                label="Users"
                minRows={2}
                placeholder="Add a User ID"
                {...register(`users`, {
                    validate(input) {
                        return /^([0-9,\s])*$/.test(input?.toString() ?? "")
                            ? undefined
                            : "The User IDs are invalid!";
                    },
                })}
            />

            <div className="py-2 text-xs text-red-600">
                {errors?.users?.message?.toString()}
            </div>

            <Textarea
                type="text"
                label="Roles"
                minRows={2}
                placeholder="Add a Role ID"
                {...register(`roles`, {
                    validate(input) {
                        return /^([0-9,\s])*$/.test(input?.toString() ?? "")
                            ? undefined
                            : "The Role IDs are invalid!";
                    },
                })}
            />
            <div className="py-2 text-xs text-red-600">
                {errors?.roles?.message?.toString()}
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

export default PermissionRoleCreateForm;
