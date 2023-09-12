import { SettingCardProps } from "@/types/SetttingCardProps";
import { formatDuration } from "@/utils/utils";
import { FormHelperText, MenuItem, TextField } from "@mui/material";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { FC, useState } from "react";
import Switch from "../Common/Switch";
import EntitySelect from "../Form/EntitySelect";

const AntiRaidCard: FC<SettingCardProps> = ({
    register,
    data: { config },
    errors,
    setValue,
}) => {
    const [state, setState] = useState(() => ({
        enabled: !!config?.antiraid?.enabled,
        max_joins: config?.antiraid?.max_joins ?? 0,
        timeframe: config?.antiraid?.timeframe ?? 0,
        action: config?.antiraid?.action ?? "lock",
    }));

    const actions = [
        ["lock", "Lock channels"],
        [
            "antijoin",
            "Enable anti-join systems that prevent new users from joining",
        ],
        ["lock_and_antijoin", "Lock channels and enable anti-join systems"],
    ];

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between w-[100%] relative">
                    <h4 className="font-bold text-large pl-2">
                        Raid Protection
                    </h4>
                    <div>
                        <Switch
                            defaultChecked={!!config?.antiraid?.enabled}
                            {...register("antiraid.enabled", {
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
                    Monitors the new members and protects the server from being
                    raided.
                </p>

                {state.enabled && (
                    <>
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <TextField
                                    type="number"
                                    label="Join Count Threshold"
                                    defaultValue={
                                        config?.antiraid?.max_joins ?? 0
                                    }
                                    {...register("antiraid.max_joins", {
                                        required: {
                                            value: true,
                                            message:
                                                "This field can't be empty!",
                                        },
                                        min: {
                                            value: 0,
                                            message:
                                                "Join count threshold must be a number greater than 0!",
                                        },
                                        max: {
                                            value: 100,
                                            message:
                                                "Join count threshold must be a number less than 100!",
                                        },
                                        valueAsNumber: true,
                                        onChange(event) {
                                            setState(state => ({
                                                ...state,
                                                max_joins: parseInt(
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
                                        ).antiraid?.max_joins?.message?.toString()}
                                    </span>
                                </FormHelperText>
                            </div>

                            <div>
                                <TextField
                                    type="number"
                                    label="Timeframe"
                                    defaultValue={
                                        config?.antiraid?.timeframe ?? 0
                                    }
                                    {...register("antiraid.timeframe", {
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
                                            value: 172800000,
                                            message:
                                                "Timeframe must be a value in milliseconds and less than 172800000 (2 days)",
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
                                        ).antiraid?.timeframe?.message?.toString()}
                                    </span>
                                </FormHelperText>
                            </div>
                        </div>

                        <FormHelperText>
                            {!isNaN(state.max_joins) &&
                                !isNaN(state.timeframe) && (
                                    <>
                                        Raid protection will be triggered if{" "}
                                        {state.max_joins} new members join the
                                        server in{" "}
                                        {formatDuration(state.timeframe)}.
                                    </>
                                )}
                        </FormHelperText>

                        <div className="pb-6"></div>

                        <TextField
                            select
                            label="Action"
                            defaultValue={config?.antiraid?.action ?? "auto"}
                            {...register("antiraid.action", {
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

                        {(state.action === "lock" ||
                            state.action === "lock_and_antijoin") && (
                            <div className="pt-4">
                                <EntitySelect
                                    entityType="channel"
                                    textFieldLabel="Channels"
                                    multiple
                                    fieldName="antiraid.channels"
                                    setValue={setValue}
                                    {...register("antiraid.channels")}
                                />

                                <div className="pt-4"></div>

                                <TextField
                                    SelectProps={{
                                        defaultValue:
                                            config?.antiraid?.channel_mode ??
                                            "include",
                                    }}
                                    select
                                    fullWidth
                                    label="Action Mode"
                                    {...register("antiraid.channel_mode")}
                                >
                                    <MenuItem value="include">
                                        Lock these channels
                                    </MenuItem>
                                    <MenuItem value="exclude">
                                        Lock all other channels except these
                                    </MenuItem>
                                </TextField>

                                <div className="flex justify-between items-center pt-3">
                                    <label>Ignore private channels</label>
                                    <div>
                                        <Switch
                                            className="-mr-2"
                                            defaultChecked={
                                                config?.antiraid
                                                    ?.ignore_private_channels ??
                                                true
                                            }
                                            {...register(
                                                "antiraid.ignore_private_channels"
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-between items-center pt-3">
                            <label>Send logs</label>
                            <div>
                                <Switch
                                    className="-mr-2"
                                    defaultChecked={
                                        !!config?.antiraid?.send_logs
                                    }
                                    {...register("antiraid.send_logs")}
                                />
                            </div>
                        </div>
                    </>
                )}
            </CardBody>
        </Card>
    );
};

export default AntiRaidCard;
