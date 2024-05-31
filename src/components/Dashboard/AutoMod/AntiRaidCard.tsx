"use client";

import { useConfig, useConfigUpdate } from "@/hooks/config";
import { updateAntiRaidConfig } from "@/redux/slice/AntiRaidConfigSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Input,
    Select,
    SelectItem,
    Spacer,
    Switch,
} from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { MdAdminPanelSettings } from "react-icons/md";
import { z } from "zod";

const formSchema = z.object({
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
    actions: z.array(z.enum(["lock", "kick"]), {
        required_error: "Action is required!",
        invalid_type_error: "Action must be a valid string array!",
    }),
    channels_to_lock: z
        .array(z.string(), {
            invalid_type_error: "Channels must be a valid string array!",
        })
        .default([]),
});

export default function AntiRaidCard() {
    const state = useConfig("antiRaidConfig");
    const form = useForm({
        defaultValues: {
            threshold: state?.threshold ?? 0,
            timeframe: state?.timeframe ?? 0,
            actions: state.actions ?? [],
            channels_to_lock: state.channels_to_lock ?? [],
        },
        resolver: zodResolver(formSchema),
    });
    const { update } = useConfigUpdate<"antiRaidConfig">(state, updateAntiRaidConfig, form.reset);

    const onSubmit = form.handleSubmit((data: Partial<typeof state>) => {
        console.log(data);
        update(data);
    });

    return (
        <Card shadow="sm">
            <CardHeader className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <MdAdminPanelSettings size="2rem" />
                    <div className="flex flex-col">
                        <p className="text-base">Raid Protection</p>
                    </div>
                </div>
                <Switch isSelected={state?.enabled ?? false} onValueChange={(enabled) => update({ enabled })} />
            </CardHeader>
            <Divider />
            <CardBody>
                <form onSubmit={onSubmit}>
                    <Input
                        label="Threshold"
                        type="number"
                        value={form.watch("threshold").toString()}
                        {...form.register("threshold", {
                            valueAsNumber: true,
                            value: state.threshold,
                        })}
                        endContent={
                            <div className="pointer-events-none flex items-center">
                                <span className="text-small text-default-400">users</span>
                            </div>
                        }
                    />
                    <p className="mt-1 text-xs text-red-500">{form.formState.errors.threshold?.message}</p>

                    <Spacer y={3} />

                    <Input
                        label="Timeframe"
                        type="number"
                        value={form.watch("timeframe").toString()}
                        {...form.register("timeframe", {
                            valueAsNumber: true,
                            value: state.timeframe,
                        })}
                        endContent={
                            <div className="pointer-events-none flex items-center">
                                <span className="text-small text-default-400">ms</span>
                            </div>
                        }
                    />
                    <p className="mt-1 text-xs text-red-500">{form.formState.errors.timeframe?.message}</p>

                    <p className="mt-3 text-xs text-gray-500">
                        The threshold is the amount of users that can join within the timeframe before the raid
                        protection is triggered.
                    </p>

                    <Spacer y={3} />

                    <Controller
                        name="actions"
                        control={form.control}
                        render={({ field }) => (
                            <Select
                                label="Action"
                                selectionMode="multiple"
                                selectedKeys={field.value}
                                onSelectionChange={(selectedKeys) => field.onChange(Array.from(selectedKeys))}
                            >
                                {[
                                    {
                                        label: "Lock",
                                        value: "lock",
                                    },
                                    {
                                        label: "Kick Member",
                                        value: "kick",
                                    },
                                ].map(({ label, value }) => (
                                    <SelectItem key={value} value={value}>
                                        {label}
                                    </SelectItem>
                                ))}
                            </Select>
                        )}
                    />

                    {form.watch("actions").includes("lock") && (
                        <>
                            <Spacer y={3} />
                            <Controller
                                name="channels_to_lock"
                                control={form.control}
                                render={({ field }) => (
                                    <Select
                                        label="Channels To Lock"
                                        selectionMode="multiple"
                                        selectedKeys={field.value}
                                        onSelectionChange={(selectedKeys) => field.onChange(Array.from(selectedKeys))}
                                    >
                                        {[
                                            {
                                                label: "Channel 1",
                                                value: "channel1",
                                            },
                                            {
                                                label: "Channel 2",
                                                value: "channel2",
                                            },
                                        ].map(({ label, value }) => (
                                            <SelectItem key={value} value={value}>
                                                {`#${label}`}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </>
                    )}
                </form>
            </CardBody>
            <CardFooter className="flex justify-end">
                {form.formState.isDirty && (
                    <Button type="button" variant="flat" onClick={onSubmit}>
                        Save
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
