"use client";

import { useGuildConfiguration } from "@/contexts/GuildConfigurationContext";
import { useGuildConfigurationUpdate } from "@/hooks/config";
import { logger } from "@/logging/logger";
import { Tooltip } from "@mui/material";
import { Checkbox, Input, Spacer } from "@nextui-org/react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { BsDashCircle } from "react-icons/bs";
import { MdQuestionMark } from "react-icons/md";
import Card from "../Layout/Card";

export default function PrefixCard() {
    const configuration = useGuildConfiguration();
    const { prefix } = configuration;
    const update = useGuildConfigurationUpdate();
    const { register, formState, handleSubmit, reset } = useForm({
        defaultValues: {
            prefix,
            commands: {
                mention_prefix: configuration.commands?.mention_prefix ?? false,
            },
        },
    });
    const initialRenderRef = useRef(true);

    useEffect(() => {
        if (initialRenderRef.current) {
            initialRenderRef.current = false;
            return;
        }

        reset(configuration as unknown as Parameters<typeof reset>[0]);
        logger.debug("PrefixCard:useEffect", "Reset form");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [configuration]);

    return (
        <Card>
            <Card.Header icon={BsDashCircle} title="Prefix" />
            <Card.Form formState={formState} onSubmit={handleSubmit(update)}>
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
            </Card.Form>
        </Card>
    );
}
