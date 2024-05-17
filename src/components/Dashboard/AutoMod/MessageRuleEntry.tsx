"use client";

import { useIsDesktop } from "@/hooks/viewport";
import { logger } from "@/logging/logger";
import { useAppDispatch } from "@/redux/hooks/AppStoreHooks";
import { setEditModalState } from "@/redux/slice/MessageRuleListSlice";
import { APIMessageRule, APIMessageRuleType } from "@/types/APIMessageRule";
import { Button } from "@mui/material";
import { useEffect, useMemo, useRef, type FC } from "react";
import { IconType } from "react-icons/lib";
import {
    MdDomain,
    MdDragIndicator,
    MdFilePresent,
    MdLink,
    MdPattern,
    MdTableRows,
    MdTextSnippet,
} from "react-icons/md";
import MessageRuleActionIcon from "./MessageRuleActionIcon";
import MessageRuleDisabled from "./MessageRuleDisabled";
import MessageRuleModeInverted from "./MessageRuleModeInverted";

type MessageRuleEntryProps = {
    rule: APIMessageRule;
    index: number;
    onPointerDown: (event: React.PointerEvent) => void;
};

const messageRuleNames: Record<APIMessageRuleType, string> = {
    [APIMessageRuleType.Regex]: "Regex Filter",
    [APIMessageRuleType.Invite]: "Invite Filter",
    [APIMessageRuleType.Word]: "Word Filter",
    [APIMessageRuleType.Embed]: "Embed Filter",
    [APIMessageRuleType.File]: "File Filter",
    [APIMessageRuleType.Domain]: "Domain Filter",
};

const messageRuleIcons: Record<APIMessageRuleType, IconType> = {
    [APIMessageRuleType.Regex]: MdPattern,
    [APIMessageRuleType.Invite]: MdLink,
    [APIMessageRuleType.Word]: MdTextSnippet,
    [APIMessageRuleType.Embed]: MdTableRows,
    [APIMessageRuleType.File]: MdFilePresent,
    [APIMessageRuleType.Domain]: MdDomain,
};

const computeColor = (type: APIMessageRuleType) => {
    let hash = 0;

    for (let i = 0; i < type.length; i++) {
        hash = type.charCodeAt(i) + ((hash << 5) - hash);
    }

    const c = (hash & 0x00ffffff).toString(16).toUpperCase();
    return "#" + "00000".substring(0, 6 - c.length) + c;
};

const MessageRuleEntry: FC<MessageRuleEntryProps> = ({ rule, onPointerDown }) => {
    const Icon = messageRuleIcons[rule.type];
    const name = messageRuleNames[rule.type];
    const color = useMemo(() => computeColor(rule.type), [rule.type]);
    const isDesktop = useIsDesktop();
    const moveButtonRef = useRef<HTMLButtonElement>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const touchHandler: (e: Event) => void = (e) => e.preventDefault();
        const button = moveButtonRef.current;

        if (button) {
            button.addEventListener("touchstart", touchHandler, { passive: false });

            return () => {
                button.removeEventListener("touchstart", touchHandler, {
                    passive: false,
                } as EventListenerOptions);
            };
        }
    }, []);

    return (
        <div
            className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-100 p-3 hover:bg-gray-200 dark:bg-[rgb(35,35,35)] dark:hover:bg-[rgb(50,50,50)] lg:pr-4"
            onClick={() => {
                dispatch(setEditModalState({ isOpen: true, rule }));
                logger.debug("MessageRuleEntry", "Opening edit modal for rule", rule.id);
            }}
        >
            <div className="flex items-center gap-3">
                <Icon
                    className="rounded-lg p-1"
                    size="2rem"
                    style={{
                        color,
                        border: `1px solid ${color}`,
                    }}
                />
                <span className="text-sm font-semibold">{name}</span>

                {!rule.enabled && <MessageRuleDisabled />}
                {rule.mode === "invert" && <MessageRuleModeInverted />}
            </div>

            <div className="flex items-center gap-3">
                {isDesktop && rule.actions.map((action) => <MessageRuleActionIcon key={action} action={action} />)}

                <div className="ml-4">
                    <Button
                        ref={moveButtonRef}
                        sx={{ minWidth: 0, cursor: "move" }}
                        onPointerDown={onPointerDown}
                        disableTouchRipple
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                    >
                        <MdDragIndicator size="1.5rem" className="text-default-500" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MessageRuleEntry;
