import { SettingCardProps } from "@/types/SetttingCardProps";
import {
    Card,
    CardBody,
    CardHeader,
    Select,
    SelectItem,
} from "@nextui-org/react";
import { FC, useState } from "react";
import { FaDiscord } from "react-icons/fa6";
import { HiShieldCheck, HiSquare2Stack } from "react-icons/hi2";

const permissionModes = [
    {
        name: "Discord",
        description: "Completely rely on Discord-based permissions.",
        id: "discord",
        icon: FaDiscord,
    },
    {
        name: "Level-based",
        description:
            "Create and manage bot permissions using different permission levels represented by numbers 0-100.",
        id: "levels",
        icon: HiSquare2Stack,
    },
    {
        name: "Permission Roles (Advanced)",
        description:
            "Create and manage custom bot permission roles that specify who will receive what permissions and much more.",
        id: "advanced",
        icon: HiShieldCheck,
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
                <p className="pb-6 text-[#999]">
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
                    classNames={{
                        popover: "[overflow-wrap:break-word]",
                        innerWrapper: "[overflow-wrap:break-word]",
                        value: "[overflow-wrap:break-word]",
                        description: "[overflow-wrap:break-word]",
                    }}
                >
                    {permissionModes.map(permissionMode => (
                        <SelectItem
                            key={permissionMode.id}
                            title={permissionMode.name}
                            className="relative"
                            description={permissionMode.description}
                            startContent={<permissionMode.icon size={25} />}
                        />
                    ))}
                </Select>
            </CardBody>
        </Card>
    );
};

export default PermissionModeCard;
