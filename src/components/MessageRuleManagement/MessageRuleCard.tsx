import { SettingCardProps } from "@/types/SetttingCardProps";
import { Button } from "@mui/material";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { FC, useState } from "react";
import { MdAdd } from "react-icons/md";
import Switch from "../Common/Switch";
import MessageRules from "./MessageRules";

const MessageRuleCard: FC<SettingCardProps> = ({
    register,
    errors,
    data: { config },
}) => {
    const [state, setState] = useState(() => ({
        enabled: !!config?.message_rules?.enabled,
    }));

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between w-[100%] relative">
                    <h4 className="font-bold text-large pl-2">Message Rules</h4>
                    <div className="flex items-center gap-3">
                        {state.enabled && (
                            <Button startIcon={<MdAdd />}>Create</Button>
                        )}
                        <Switch
                            defaultChecked={!!config?.message_rules?.enabled}
                            {...register("message_filter.enabled", {
                                onChange() {
                                    setState(s => ({
                                        ...s,
                                        enabled: !s.enabled,
                                    }));
                                },
                            })}
                        />
                    </div>
                </div>
            </CardHeader>

            <CardBody>
                <p className="pb-6">
                    Control what messages can be sent in your server.
                </p>

                <MessageRules rules={config?.message_rules?.rules ?? []} />
            </CardBody>
        </Card>
    );
};

export default MessageRuleCard;
