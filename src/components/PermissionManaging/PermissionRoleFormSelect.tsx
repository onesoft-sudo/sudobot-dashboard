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
