"use client";

import { useConfig, useConfigUpdate } from "@/hooks/config";
import { logger } from "@/logging/logger";
import { updateRootConfig } from "@/redux/slice/RootConfigSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { BsDashCircle } from "react-icons/bs";
import { z } from "zod";

const formSchema = z.object({
    prefix: z
        .string({
            required_error: "Prefix is required",
        })
        .min(1, "Prefix cannot be empty!"),
});

export default function PrefixCard() {
    const state = useConfig("rootConfig");
    const {
        formState: { errors, isDirty },
        register,
        handleSubmit,
        reset,
        watch,
    } = useForm<typeof state>({
        defaultValues: state,
        resolver: zodResolver(formSchema),
    });
    const { update } = useConfigUpdate<"rootConfig">(state, updateRootConfig, reset);
    const onValidSubmit = handleSubmit((data) => {
        logger.debug("PrefixCard", "onValidSubmit", data);
        update(data);
    });

    return (
        <Card shadow="sm">
            <CardHeader className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <BsDashCircle size="2rem" />
                    <div className="flex flex-col">
                        <p className="text-base">Command Prefix</p>
                    </div>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <form onSubmit={onValidSubmit}>
                    <Input
                        label="Prefix"
                        value={watch("prefix")}
                        {...register("prefix", {
                            required: "Prefix is required",
                        })}
                    />
                    <p className="mt-1 text-xs text-red-500">{errors.prefix?.message}</p>
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
