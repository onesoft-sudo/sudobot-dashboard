"use client";

import { useGuildConfigurationUpdate } from "@/hooks/config";
import { useConfigForm } from "@/hooks/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, SelectItem, Spacer } from "@nextui-org/react";
import { MdAdminPanelSettings } from "react-icons/md";
import { z } from "zod";
import Card from "../Layout/Card";

const formSchema = z.object({
    raid_protection: z.object({
        enabled: z.boolean().default(false),
        threshold: z
            .number({
                required_error: "Threshold is required!",
                invalid_type_error: "Threshold must be a valid integer!",
            })
            .int("Threshold must be a valid integer!")
            .min(0, "Threshold must be greater than 0!"),
        timeframe: z
            .number({
                required_error: "Timeframe is required!",
                invalid_type_error: "Timeframe must be a valid integer!",
            })
            .int("Timeframe must be a valid integer!")
            .min(0, "Timeframe must be greater than 0!"),
        action: z.enum(["lock", "antijoin", "lock_and_antijoin", "none", "auto"], {
            required_error: "Action is required!",
            invalid_type_error: "Action must be a valid string!",
        }),
        channels: z
            .array(z.string(), {
                invalid_type_error: "Channels must be a valid string array!",
            })
            .default([]),
    }),
});

export default function AntiRaidCard() {
    const { form } = useConfigForm<z.infer<typeof formSchema>>(({ raid_protection }) => ({
        defaultValues: {
            raid_protection: {
                enabled: raid_protection?.enabled ?? false,
                threshold: raid_protection?.threshold ?? 0,
                timeframe: raid_protection?.timeframe ?? 0,
                action: raid_protection?.action ?? "auto",
                channels: raid_protection?.channels ?? [],
            },
        },
        resolver: zodResolver(formSchema),
    }));
    const { register, formState, handleSubmit, control, watch, reset } = form;
    const update = useGuildConfigurationUpdate(reset);

    return (
        <Card
            form={form}
            onSubmit={handleSubmit(({ raid_protection }) => {
                update({
                    raid_protection,
                });
            })}
        >
            <Card.Header icon={MdAdminPanelSettings} title="Raid Protection" switchName="raid_protection.enabled" />
            <Card.FormBody>
                <Card.FormControl
                    component={Input}
                    label="Threshold"
                    type="number"
                    {...register("raid_protection.threshold", {
                        valueAsNumber: true,
                    })}
                    endContent={
                        <div className="pointer-events-none flex items-center">
                            <span className="text-small text-default-400">users</span>
                        </div>
                    }
                />

                <Spacer y={3} />

                <Card.FormControl
                    component={Input}
                    label="Timeframe"
                    type="number"
                    {...register("raid_protection.timeframe", {
                        valueAsNumber: true,
                    })}
                    endContent={
                        <div className="pointer-events-none flex items-center">
                            <span className="text-small text-default-400">ms</span>
                        </div>
                    }
                />

                <p className="mt-3 text-xs text-gray-500">
                    The threshold is the amount of users that can join within the timeframe before the raid protection
                    is triggered.
                </p>

                <Spacer y={3} />

                <Card.FormSelect name="raid_protection.action" control={control} label="Action" selectionMode="single">
                    {[
                        {
                            label: "None",
                            value: "none",
                        },
                        {
                            label: "Auto",
                            value: "auto",
                        },
                        {
                            label: "Lock Channels",
                            value: "lock",
                        },
                        {
                            label: "Enable Anti-Join Mode",
                            value: "antijoin",
                        },
                        {
                            label: "Lock Channels & Enable Anti-Join Mode",
                            value: "lock_and_antijoin",
                        },
                    ].map(({ label, value }) => (
                        <SelectItem key={value} value={value}>
                            {label}
                        </SelectItem>
                    ))}
                </Card.FormSelect>

                {watch("raid_protection.action")?.startsWith("lock") && (
                    <>
                        <Spacer y={3} />
                        <Card.FormSelect
                            name="raid_protection.channels"
                            control={control}
                            label="Channels To Lock"
                            selectionMode="multiple"
                        >
                            {[
                                {
                                    label: "Channel 1",
                                    value: "1134518138172620903",
                                },
                                {
                                    label: "Channel 2",
                                    value: "1134518138172620902",
                                },
                            ].map(({ label, value }) => (
                                <SelectItem key={value} value={value}>
                                    {`#${label}`}
                                </SelectItem>
                            ))}
                        </Card.FormSelect>
                    </>
                )}

                <Spacer y={3} />
                <Card.FormSubmit />
            </Card.FormBody>
        </Card>
    );
}
