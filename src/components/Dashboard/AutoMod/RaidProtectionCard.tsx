"use client";

import { EntityType } from "@/components/Form/EntitySelect";
import { useGuildConfigurationUpdate } from "@/hooks/config";
import { useDialog } from "@/hooks/dialog";
import { useConfigForm } from "@/hooks/forms";
import { logger } from "@/logging/logger";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, SelectItem, Spacer } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { Controller } from "react-hook-form";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
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

export default function RaidProtectionCard() {
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

    const { handleSubmit, watch, reset, formState } = form;
    const timeframeRef = useRef<HTMLInputElement>(null);
    const update = useGuildConfigurationUpdate(reset);

    const { open } = useDialog((close) => ({
        title: "The timeframe is too low!",
        description:
            "The timeframe must be greater than 10,000. Please increase the timeframe to prevent false positives.",
        icon: HiOutlineExclamationTriangle,
        buttons: [
            {
                type: "primary",
                id: "increase",
                label: "Increase Timeframe",
                onPress: close,
            },
            {
                type: "action",
                id: "continue",
                label: "Continue Anyway",
                onPress: close,
            },
            {
                type: "cancel",
                id: "cancel",
                label: "Cancel",
                onPress: close,
            },
        ],
        classes: {
            icon: "scale-150 text-yellow-500 dark:text-yellow-600",
        },
    }));

    const mutation = useMutation({
        mutationFn: async ({ raid_protection }: z.infer<typeof formSchema>) => {
            if (raid_protection?.enabled && (raid_protection.timeframe ?? 0) < 10_000) {
                const waitForResponse = open();
                const response = await waitForResponse();

                if (response === "increase" && timeframeRef.current) {
                    timeframeRef.current.focus();
                }

                if (response !== "continue") {
                    throw new Error();
                }
            }

            logger.info(RaidProtectionCard.name, "Updating raid protection configuration");

            await update({
                raid_protection,
            });
        },
    });

    return (
        <>
            <Card
                form={form}
                onSubmit={handleSubmit((data) => mutation.mutate(data))}
                showSubmitButton={mutation.isError || formState.isDirty || formState.isSubmitting}
            >
                <Card.Header icon={MdAdminPanelSettings} title="Raid Protection" switchName="raid_protection.enabled" />
                <Card.FormBody>
                    <Controller
                        name="raid_protection.threshold"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Input
                                label="Threshold"
                                type="number"
                                onValueChange={(value) => field.onChange(+value)}
                                onBlur={field.onBlur}
                                defaultValue={field.value.toString()}
                                endContent={
                                    <div className="pointer-events-none flex items-center">
                                        <span className="text-small text-default-400">users</span>
                                    </div>
                                }
                                isInvalid={!!fieldState.error}
                                errorMessage={fieldState.error?.message}
                            />
                        )}
                    />

                    <Spacer y={3} />

                    <Controller
                        name="raid_protection.timeframe"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Input
                                label="Timeframe"
                                type="number"
                                ref={timeframeRef}
                                onValueChange={(value) => field.onChange(+value)}
                                onBlur={field.onBlur}
                                defaultValue={field.value.toString()}
                                endContent={
                                    <div className="pointer-events-none flex items-center">
                                        <span className="text-small text-default-400">ms</span>
                                    </div>
                                }
                                isInvalid={!!fieldState.error}
                                errorMessage={fieldState.error?.message}
                            />
                        )}
                    />

                    <p className="mt-3 text-xs text-gray-500">
                        The threshold is the amount of users that can join within the timeframe before the raid
                        protection is triggered.
                    </p>

                    <Spacer y={3} />

                    <Card.FormSelect name="raid_protection.action" label="Action" selectionMode="single">
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
                            <Card.FormEntitySelect
                                name="raid_protection.channels"
                                label="Channels To Lock"
                                type={EntityType.Channel}
                            />
                        </>
                    )}

                    <Card.FormSubmit className="mt-3" />
                </Card.FormBody>
            </Card>
        </>
    );
}
