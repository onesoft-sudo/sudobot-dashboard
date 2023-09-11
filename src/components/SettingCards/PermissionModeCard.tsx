import { SettingCardProps } from "@/types/SetttingCardProps";
import {
    Card,
    CardBody,
    CardHeader,
    Select,
    SelectItem,
} from "@nextui-org/react";
import { FC, useState } from "react";

const permissionModes = [
    {
        name: "Discord",
        description: "Completely rely on Discord-based permissions",
        id: "discord",
    },
    {
        name: "Level-based",
        description:
            "Create and manage bot permissions using different permission levels represented by numbers 0-100",
        id: "levels",
    },
    {
        name: "Permission Role (Advanced)",
        description:
            "Create and manage bot permissions using different permission levels represented by numbers 0-100",
        id: "advanced",
    },
];

const PermissionModeCard: FC<SettingCardProps> = ({
    register,
    errors,
    data: { config },
}) => {
    const [mode, setMode] = useState(config.permissions.mode ?? "discord");

    return (
        <Card>
            <CardHeader>
                <h4 className="font-bold text-large pl-2">Permission Mode</h4>
            </CardHeader>

            <CardBody>
                <p className="pb-6">
                    Select the permission mode for the bot that you like.
                </p>

                <Select
                    items={permissionModes}
                    label="Permission Mode"
                    placeholder="Select a permission mode"
                    labelPlacement="outside"
                    {...register("permissions.mode", {
                        required: {
                            message: "Please enter a valid prefix!",
                            value: true,
                        },
                        onChange: e => {
                            if (e.target.value) {
                                setMode(e.target.value);
                            }
                        },
                        value: mode,
                    })}
                    selectedKeys={[mode]}
                >
                    {permissionModes.map(permissionMode => (
                        <SelectItem
                            key={permissionMode.id}
                            textValue={permissionMode.name}
                        >
                            <div>{permissionMode.name}</div>
                        </SelectItem>
                    ))}
                </Select>
            </CardBody>
        </Card>
    );
};

export default PermissionModeCard;
