"use client";

import { logger } from "@/logging/logger";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/AppStoreHooks";
import { updateRuleModerationConfig } from "@/redux/slice/ConfigSlice";
import { addSaveHandler, setUnsavedChanges } from "@/redux/slice/UnsavedChangesSlice";
import { Card, CardBody, CardHeader, Divider, Switch } from "@nextui-org/react";
import { MdRule } from "react-icons/md";
import MessageRuleListWrapper from "./MessageRuleListWrapper";

export default function MessageRuleManagementCard() {
    const state = useAppSelector((state) => state.config.rule_moderation);
    const hasChanges = useAppSelector((state) => state.unsavedChanges.hasChanges);
    const dispatch = useAppDispatch();

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
                    onValueChange={(enabled) =>
                        dispatch(
                            updateRuleModerationConfig({
                                enabled,
                            }),
                        )
                    }
                />
            </CardHeader>
            <Divider />
            <CardBody className="overflow-y-hidden">
                {state?.rules?.length ? (
                    <MessageRuleListWrapper
                        rules={state?.rules ?? []}
                        onChange={(rules) => {
                            logger.debug("MessageRuleManagementCard", "Changed Rules", rules);

                            addSaveHandler(MessageRuleManagementCard.name, () => {
                                dispatch(
                                    updateRuleModerationConfig({
                                        rules,
                                    }),
                                );
                            });

                            if (!hasChanges) {
                                dispatch(
                                    setUnsavedChanges({
                                        hasChanges: true,
                                    }),
                                );
                            }
                        }}
                    />
                ) : (
                    <p>No message rule to display.</p>
                )}
            </CardBody>
        </Card>
    );
}
