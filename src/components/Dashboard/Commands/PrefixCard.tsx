"use client";

import { useGuildConfigurationUpdate } from "@/hooks/config";
import { useConfigForm } from "@/hooks/forms";
import { Tooltip } from "@mui/material";
import { Checkbox, Input, Spacer } from "@nextui-org/react";
import { BsDashCircle } from "react-icons/bs";
import { MdQuestionMark } from "react-icons/md";
import Card from "../Layout/Card";

export default function PrefixCard() {
    const update = useGuildConfigurationUpdate();
    const { form, configuration } = useConfigForm((configuration) => ({
        defaultValues: {
            prefix: configuration.prefix,
            commands: {
                mention_prefix: configuration.commands?.mention_prefix ?? false,
            },
        },
    }));
    const { register, formState, handleSubmit } = form;
    const { prefix } = configuration;

    return (
        <Card form={form} onSubmit={handleSubmit(update)}>
            <Card.Header icon={BsDashCircle} title="Prefix" />
            <Card.FormBody>
                <Input
                    label="Prefix"
                    {...register("prefix", {
                        required: "Prefix is required!",
                        validate: (value) => (value.includes(" ") ? "Prefix cannot contain spaces!" : undefined),
                    })}
                    errorMessage={formState.errors.prefix?.message}
                    isInvalid={!!formState.errors.prefix?.message}
                />
                <Spacer y={2} />
                <Checkbox {...register("commands.mention_prefix")}>
                    <div className="flex items-center gap-2">
                        <span>Use mention prefix</span>{" "}
                        <Tooltip
                            classes={{
                                tooltip: "dark:bg-[#222] text-sm",
                            }}
                            title="Allows you to run commands by using the bot's mention as prefix."
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

                <p className="mt-3 text-sm text-[#999]">
                    Legacy command prefix is now set to <code className="text-black dark:text-white">{prefix}</code>.
                    <br />
                    Use this prefix
                    {configuration.commands?.mention_prefix && " or tag the bot at the beginning of your message"} to
                    run a legacy command.
                </p>
                <Card.FormSubmit className="mt-4" />
            </Card.FormBody>
        </Card>
    );
}
