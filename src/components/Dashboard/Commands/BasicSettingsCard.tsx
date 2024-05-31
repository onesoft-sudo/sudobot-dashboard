"use client";

import { useConfig, useConfigUpdate } from "@/hooks/config";
import { logger } from "@/logging/logger";
import { updateCommandConfig } from "@/redux/slice/CommandConfigSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tooltip } from "@mui/material";
import { Button, Card, CardBody, CardFooter, CardHeader, Checkbox, CheckboxGroup, Divider } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { HiOutlineCommandLine } from "react-icons/hi2";
import { MdQuestionMark } from "react-icons/md";
import { z } from "zod";

const formSchema = z.object({
    allowed_modes: z.array(z.enum(["legacy", "interactions"])).default(["legacy", "interactions"]),
});

export default function BasicSettingsCard() {
    const state = useConfig("commandConfig");
    const {
        formState: { errors, isDirty },
        register,
        control,
        handleSubmit,
        reset,
        watch,
    } = useForm<typeof state>({
        defaultValues: state,
        resolver: zodResolver(formSchema),
    });
    const { update } = useConfigUpdate<"commandConfig">(state, updateCommandConfig, reset);
    const onValidSubmit = handleSubmit((data) => {
        logger.debug("BasicSettingsCard", "onValidSubmit", data);
        update(data);
    });

    return (
        <Card shadow="sm">
            <CardHeader className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <HiOutlineCommandLine size="2rem" />
                    <div className="flex flex-col">
                        <p className="text-base">Basic Command Preferences</p>
                    </div>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <form onSubmit={onValidSubmit}>
                    <Controller
                        name="allowed_modes"
                        control={control}
                        render={({ field }) => (
                            <CheckboxGroup
                                label="Allowed Modes"
                                color="primary"
                                value={field.value}
                                onValueChange={(value) => field.onChange(Array.from(value))}
                            >
                                <Checkbox value="legacy">
                                    <div className="flex items-center gap-2">
                                        <span>Legacy</span>{" "}
                                        <Tooltip
                                            classes={{
                                                tooltip: "dark:bg-[#222] text-sm",
                                            }}
                                            title="Allows you to run commands in the legacy way, using a prefix."
                                        >
                                            <div>
                                                <MdQuestionMark
                                                    size="1.3rem"
                                                    className="rounded-full border-1.5 border-black p-0.5 dark:border-white"
                                                />
                                            </div>
                                        </Tooltip>
                                    </div>
                                </Checkbox>
                                <Checkbox value="interactions">
                                    <div className="flex items-center gap-2">
                                        <span>Interactions</span>{" "}
                                        <Tooltip
                                            classes={{
                                                tooltip: "dark:bg-[#222] text-sm",
                                            }}
                                            title="Allows you to run commands using Discord's new interaction system."
                                        >
                                            <div>
                                                <MdQuestionMark
                                                    size="1.3rem"
                                                    className="rounded-full border-1.5 border-black p-0.5 dark:border-white"
                                                />
                                            </div>
                                        </Tooltip>
                                    </div>
                                </Checkbox>
                            </CheckboxGroup>
                        )}
                    />
                </form>
            </CardBody>

            {isDirty && (
                <CardFooter>
                    <Button variant="flat" type="button" onClick={onValidSubmit}>
                        Done
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
}
