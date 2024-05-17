"use client";

import { APIMessageRuleType } from "@/types/APIMessageRule";
import { APIModerationAction } from "@/types/APIModerationAction";
import { Card, CardBody, CardHeader, Divider, Switch } from "@nextui-org/react";
import { MdRule } from "react-icons/md";
import MessageRuleListWrapper from "./MessageRuleListWrapper";

export default function MessageRuleManagementCard() {
    return (
        <Card shadow="sm" className="md:col-span-2">
            <CardHeader className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <MdRule size="2rem" />
                    <div className="flex flex-col">
                        <p className="text-base">Message Rules</p>
                    </div>
                </div>
                <Switch />
            </CardHeader>
            <Divider />
            <CardBody className="overflow-y-hidden">
                <MessageRuleListWrapper
                    rules={[
                        {
                            enabled: true,
                            id: "1n",
                            type: APIMessageRuleType.Regex,
                            mode: "normal",
                            actions: [APIModerationAction.DeleteMessage],
                        },
                        {
                            enabled: true,
                            id: "2n",
                            type: APIMessageRuleType.Embed,
                            mode: "normal",
                            actions: [APIModerationAction.DeleteMessage],
                        },
                        {
                            enabled: false,
                            id: "3n",
                            type: APIMessageRuleType.Invite,
                            mode: "normal",
                            actions: [APIModerationAction.DeleteMessage, APIModerationAction.Kick],
                        },
                        {
                            enabled: true,
                            id: "4n",
                            type: APIMessageRuleType.Word,
                            mode: "invert",
                            actions: [
                                APIModerationAction.DeleteMessage,
                                APIModerationAction.Warn,
                                APIModerationAction.Ban,
                            ],
                        },
                        {
                            enabled: true,
                            id: "5n",
                            type: APIMessageRuleType.File,
                            mode: "normal",
                            actions: [APIModerationAction.DeleteMessage],
                        },
                        {
                            enabled: true,
                            id: "6n",
                            type: APIMessageRuleType.Domain,
                            mode: "normal",
                            actions: [APIModerationAction.DeleteMessage],
                        },
                    ]}
                />
            </CardBody>
        </Card>
    );
}
