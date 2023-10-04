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

import { SettingCardProps } from "@/types/SetttingCardProps";
import { formatDuration } from "@/utils/utils";
import { FormHelperText, MenuItem, TextField } from "@mui/material";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { FC, useState } from "react";
import Switch from "../Common/Switch";

const AntiSpamCard: FC<SettingCardProps> = ({
    register,
    data: { config },
    errors,
}) => {
    const [state, setState] = useState(() => ({
        enabled: !!config?.antispam?.enabled,
        limit: config?.antispam?.limit ?? 0,
        timeframe: config?.antispam?.timeframe ?? 0,
        action: config?.antispam?.action ?? "auto",
        mute_duration: config?.antispam?.mute_duration ?? 3_600_000,
    }));

    console.log(config.antispam?.action);

    const actions = [
        ["auto", "Auto"],
        ["mute", "Mute user"],
        ["mute_clear", "Mute user and clear recent messages"],
        ["warn", "Warn user"],
        ["verbal_warn", "Verbally warn the user"],
    ];

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between w-[100%] relative">
                    <h4 className="font-bold text-large pl-2">Anti Spam</h4>
                    <div>
                        <Switch
                            defaultChecked={!!config?.antispam?.enabled}
                            {...register("antispam.enabled", {
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
                <p className="pb-6 text-[#999]">
                    Rate-limits the messages and prevents users from spamming.
                </p>

                {state.enabled && (
                    <>
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <TextField
                                    type="number"
                                    label="Message Threshold"
                                    defaultValue={config?.antispam?.limit ?? 0}
                                    {...register("antispam.limit", {
                                        required: {
                                            value: true,
                                            message:
                                                "This field can't be empty!",
                                        },
                                        min: {
                                            value: 0,
                                            message:
                                                "Message threshold must be a number greater than 0!",
                                        },
                                        max: {
                                            value: 50,
                                            message:
                                                "Message threshold must be a number less than 50!",
                                        },
                                        valueAsNumber: true,
                                        onChange(event) {
                                            setState(state => ({
                                                ...state,
                                                limit: parseInt(
                                                    event.target.value
                                                ),
                                            }));
                                        },
                                    })}
                                />
                                <FormHelperText>
                                    <span className="text-red-600">
                                        {(
                                            errors as any
                                        ).antispam?.limit?.message?.toString()}
                                    </span>
                                </FormHelperText>
                            </div>

                            <div>
                                <TextField
                                    type="number"
                                    label="Timeframe"
                                    defaultValue={
                                        config?.antispam?.timeframe ?? 0
                                    }
                                    {...register("antispam.timeframe", {
                                        required: {
                                            value: true,
                                            message:
                                                "This field can't be empty!",
                                        },
                                        min: {
                                            value: 0,
                                            message:
                                                "Timeframe must be a value in milliseconds and greater than 0!",
                                        },
                                        max: {
                                            value: 120_000,
                                            message:
                                                "Timeframe must be a value in milliseconds and less than 120000 (2 minutes)",
                                        },
                                        valueAsNumber: true,
                                        onChange(event) {
                                            setState(state => ({
                                                ...state,
                                                timeframe: parseInt(
                                                    event.target.value
                                                ),
                                            }));
                                        },
                                    })}
                                />
                                <FormHelperText>
                                    <span className="text-red-600">
                                        {(
                                            errors as any
                                        ).antispam?.timeframe?.message?.toString()}
                                    </span>
                                </FormHelperText>
                            </div>
                        </div>

                        <FormHelperText>
                            {!isNaN(state.limit) && !isNaN(state.timeframe) && (
                                <>
                                    Sending {state.limit} messages in{" "}
                                    {formatDuration(state.timeframe)} will be
                                    considered as spam.
                                </>
                            )}
                        </FormHelperText>

                        <div className="pb-6"></div>

                        <TextField
                            select
                            label="Action"
                            defaultValue={config?.antispam?.action ?? "auto"}
                            {...register("antispam.action", {
                                required: {
                                    value: true,
                                    message:
                                        "Please provide an action to take!",
                                },
                                onChange(event) {
                                    setState(state => ({
                                        ...state,
                                        action: event.target.value,
                                    }));
                                },
                            })}
                        >
                            {actions.map(([action, userFriendlyActionName]) => (
                                <MenuItem key={action} value={action}>
                                    {userFriendlyActionName}
                                </MenuItem>
                            ))}
                        </TextField>

                        {state.action.startsWith("mute") && (
                            <>
                                <div className="pb-6"></div>
                                <TextField
                                    type="number"
                                    label="Mute Duration"
                                    defaultValue={
                                        config?.antispam?.mute_duration ??
                                        3_600_000
                                    }
                                    {...register("antispam.mute_duration", {
                                        required: {
                                            value: true,
                                            message:
                                                "This field can't be empty!",
                                        },
                                        min: {
                                            value: 0,
                                            message:
                                                "The duration must be a value in milliseconds and greater than 0!",
                                        },
                                        valueAsNumber: true,
                                        onChange(event) {
                                            setState(state => ({
                                                ...state,
                                                mute_duration: parseInt(
                                                    event.target.value ??
                                                        "3600000"
                                                ),
                                            }));
                                        },
                                    })}
                                />
                                <FormHelperText>
                                    <span
                                        className={
                                            (errors as any).antispam
                                                ?.mute_duration?.message
                                                ? "text-red-600"
                                                : ""
                                        }
                                    >
                                        {(errors as any).antispam?.mute_duration
                                            ?.message
                                            ? (
                                                  errors as any
                                              ).antispam?.mute_duration?.message?.toString()
                                            : `Spammers will be muted for ${formatDuration(
                                                  state.mute_duration
                                              )}.`}
                                    </span>
                                </FormHelperText>
                            </>
                        )}
                    </>
                )}
            </CardBody>
        </Card>
    );
};

export default AntiSpamCard;
