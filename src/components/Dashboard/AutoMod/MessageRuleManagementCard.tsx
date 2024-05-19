"use client";

import { useConfigMutationHandlers } from "@/contexts/ConfigMutationProvider";
import { useRuleModerationConfigUpdate } from "@/hooks/config";
import { logger } from "@/logging/logger";
import { useAppSelector } from "@/redux/hooks/AppStoreHooks";
import { Card, CardBody, CardHeader, Divider, Switch } from "@nextui-org/react";
import { useEffect } from "react";
import { MdRule } from "react-icons/md";
import MessageRuleListWrapper from "./MessageRuleListWrapper";

export default function MessageRuleManagementCard() {
    const state = useAppSelector((state) => state.ruleModerationConfig.data);
    const { queueUpdate, update, setHasUnsavedChanges, reset, commit } = useRuleModerationConfigUpdate();
    const { emitter } = useConfigMutationHandlers();

    useEffect(() => {
        const resetHandler = () => {
            reset();
        };

        const saveHandler = () => {
            logger.debug("MessageRuleManagementCard", "Saving Changes");
            commit();
        }

        emitter.on("reset", resetHandler);
        emitter.on('save', saveHandler)

        return () => {
            emitter.off("reset", resetHandler);
            emitter.off('save', saveHandler)

        };
    }, []);

    return (
        <Card shadow="sm" className="md:col-span-2">
            <CardHeader className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <MdRule size="2rem" />
                    <div className="flex flex-col">
                        <p className="text-base">Message Rules</p>
                    </div>
                </div>
                <Switch
                    isSelected={state?.enabled ?? false}
                    onValueChange={(enabled) => {
                        update({
                            enabled,
                        });
                        setHasUnsavedChanges();
                    }}
                />
            </CardHeader>
            <Divider />
            <CardBody className="overflow-y-hidden">
                {state?.rules?.length ? (
                    <MessageRuleListWrapper
                        rules={state?.rules ?? []}
                        onChange={(rules) => {
                            logger.debug("MessageRuleManagementCard", "Changed Rules", rules);

                            queueUpdate(1, {
                                rules,
                            });
                        }}
                    />
                ) : (
                    <p>No message rule to display.</p>
                )}
            </CardBody>
        </Card>
    );
}
