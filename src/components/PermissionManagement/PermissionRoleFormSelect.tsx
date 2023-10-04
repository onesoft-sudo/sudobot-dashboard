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

import { getPermissionsArray } from "@/utils/permissions";
import { Chip, Select, SelectItem } from "@nextui-org/react";
import { FC, useState } from "react";
import { UseFormRegister, UseFormResetField } from "react-hook-form";

interface PermissionRoleFormSelectProps {
    register: UseFormRegister<any>;
    fieldName: string;
    resetField: UseFormResetField<any>;
    defaultValue?: string[];
}

const availablePermissions = getPermissionsArray();

const PermissionRoleFormSelect: FC<PermissionRoleFormSelectProps> = ({
    register,
    fieldName,
    resetField,
    defaultValue = [],
}) => {
    const [isEmpty, setIsEmpty] = useState(() => defaultValue.length === 0);
    const [keys, setKeys] = useState(() => defaultValue);

    return (
        <>
            <Select
                items={availablePermissions}
                label="Granted Permissions"
                placeholder="Select permissions"
                selectionMode="multiple"
                isMultiline={true}
                labelPlacement="outside"
                classNames={{
                    trigger: "min-h-unit-12 py-2",
                }}
                renderValue={items => {
                    return (
                        <div className="flex flex-wrap gap-2">
                            {items.map(item => (
                                <Chip key={item.key}>{item.data?.name}</Chip>
                            ))}
                        </div>
                    );
                }}
                selectedKeys={keys}
                {...register(fieldName, {
                    onChange(event) {
                        if (!event.target.value && !isEmpty) setIsEmpty(true);
                        else if (event.target.value && isEmpty)
                            setIsEmpty(false);

                        setKeys(event.target.value?.split(",") ?? []);
                    },
                })}
            >
                {permission => (
                    <SelectItem key={permission.value}>
                        {permission.name}
                    </SelectItem>
                )}
            </Select>

            {!isEmpty && (
                <a
                    className="pt-2 link text-xs"
                    href="#"
                    onClick={() => {
                        resetField(fieldName, {
                            keepError: false,
                            defaultValue: "",
                        });
                        setIsEmpty(true);
                        setKeys([]);
                    }}
                >
                    Clear all granted permissions
                </a>
            )}
        </>
    );
};

export default PermissionRoleFormSelect;
