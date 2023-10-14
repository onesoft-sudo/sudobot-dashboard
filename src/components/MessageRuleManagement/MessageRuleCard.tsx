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

import useIsDesktop from "@/hooks/useIsDesktop";
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
    const isDesktop = useIsDesktop();

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between w-[100%] relative">
                    <div className="flex items-center gap-2">
                        <h4 className="font-bold text-large pl-2">
                            Message Rules
                        </h4>
                        <h4 className="font-bold text-[10px] bg-[#007bff] py-1 px-3 rounded-lg">
                            BETA
                        </h4>
                    </div>
                    <div className="flex items-center gap-3">
                        {state.enabled && isDesktop && (
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

                <div className="flex items-center justify-end mt-3">
                    {state.enabled && !isDesktop && (
                        <Button startIcon={<MdAdd />}>Create</Button>
                    )}
                </div>
            </CardBody>
        </Card>
    );
};

export default MessageRuleCard;
