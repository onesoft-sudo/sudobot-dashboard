import Accordion from "@/components/Accordion/Accordion";
import AccordionItem from "@/components/Accordion/AccordionItem";
import CardSwitch from "@/components/Form/CardSwitch";
import NextUITextFieldStyleReset from "@/components/Utils/NextUITextFieldStyleReset";
import { useConfigMutationHandlers } from "@/contexts/ConfigMutationProvider";
import { useRuleModerationConfigUpdate } from "@/hooks/config";
import { logger } from "@/logging/logger";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/AppStoreHooks";
import { setEditModalState } from "@/redux/slice/MessageRuleListSlice";
import { APIMessageRule, APIMessageRuleType } from "@/types/APIMessageRule";
import { APIModerationAction } from "@/types/APIModerationAction";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
    Textarea,
} from "@nextui-org/react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import MessageRuleActionList from "./MessageRuleActionList";
import { computeColor, messageRuleIcons, messageRuleNames } from "./MessageRuleEntry";

type MessageRuleEditModalProps = {
    rules: APIMessageRule[];
};

type MessageRuleEditFormFields = {
    actions: APIModerationAction[];
    name?: string;
    type: APIMessageRuleType;
    enabled: boolean;
    bail?: boolean;
    mode: "normal" | "invert";
    for_users?: string[];
    for_roles?: string[];
    for_channels?: string[];
    excluded_users?: string[];
    excluded_roles?: string[];
    excluded_channels?: string[];
};

const ruleTypes = Object.values(APIMessageRuleType).filter((type) => type[0].toLowerCase() === type[0]);

export default function MessageRuleEditModal({ rules }: MessageRuleEditModalProps) {
    const { editModalOpen, editingRule } = useAppSelector((state) => state.messageRuleList);
    const dispatch = useAppDispatch();
    const { update, setHasUnsavedChanges } = useRuleModerationConfigUpdate();
    const {
        control,
        handleSubmit,
        setValue,
        register,
        formState: { errors },
        reset,
    } = useForm<MessageRuleEditFormFields>({
        defaultValues: {
            actions: [],
            enabled: false,
            bail: false,
            mode: "normal",
        },
    });
    const { emitter } = useConfigMutationHandlers();

    useEffect(() => {
        if (!editingRule) {
            return;
        }

        setValue("actions", editingRule.actions);
        setValue("bail", editingRule.bail ?? false);
        setValue("enabled", editingRule.enabled);
        setValue("mode", editingRule.mode);

        console.log("Editing Rule", editingRule);

        const handler = () => {
            dispatch(setEditModalState({ isOpen: false, rule: null }));
        };

        emitter.on("reset", handler);

        return () => {
            emitter.off("reset", handler);
        };
    }, [editingRule, dispatch, setValue, emitter]);

    useEffect(() => {
        if (!editModalOpen) {
            reset();
        }
    }, [editModalOpen, reset]);

    const handleClose = (isOpen: boolean) => {
        if (isOpen) {
            return;
        }

        dispatch(setEditModalState({ isOpen: false, rule: null }));
    };

    const onSubmit = (data: MessageRuleEditFormFields) => {
        logger.debug("MessageRuleEditModal", "Form Submit", data);
        const { actions, type, name, enabled, bail, mode } = data;

        dispatch(setEditModalState({ isOpen: false, rule: null }));
        update({
            rules: rules.map((rule) =>
                rule.id === editingRule?.id
                    ? { ...rule, actions, type, name: name || rule.name, enabled, bail: bail ?? rule.bail, mode }
                    : rule,
            ),
        });
        setHasUnsavedChanges();
    };

    if (!editingRule) {
        return null;
    }

    return (
        <Modal isOpen={editModalOpen} onOpenChange={handleClose} scrollBehavior="inside" size="lg">
            <NextUITextFieldStyleReset />

            <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Edit Message Rule</ModalHeader>
                        <ModalBody>
                            <Input
                                variant="bordered"
                                label="Rule Name"
                                defaultValue={editingRule.name}
                                {...register("name", {
                                    maxLength: { value: 100, message: "Rule Name is too long" },
                                })}
                                isInvalid={!!errors?.name}
                                errorMessage={errors?.name?.message}
                                fullWidth
                            />

                            <Select
                                placeholder="Select a type"
                                fullWidth
                                defaultSelectedKeys={[editingRule.type]}
                                {...register("type", {
                                    required: "A valid Rule Type is required!",
                                })}
                                isInvalid={!!errors?.type}
                                errorMessage={errors?.type?.message}
                                aria-label="Rule Type"
                                classNames={{ trigger: "h-12" }}
                                renderValue={(values) => {
                                    const type = values[0].key as APIMessageRuleType;
                                    const Icon = messageRuleIcons[type];
                                    const color = computeColor(type);

                                    return (
                                        <div className="flex items-center gap-3">
                                            <Icon
                                                className="rounded-lg p-1"
                                                size="2rem"
                                                style={{
                                                    color,
                                                    border: `1px solid ${color}`,
                                                }}
                                            />
                                            {values[0].textValue}
                                        </div>
                                    );
                                }}
                            >
                                {ruleTypes.map((type) => {
                                    const Icon = messageRuleIcons[type];
                                    const color = computeColor(type);

                                    return (
                                        <SelectItem
                                            key={type}
                                            value={type}
                                            startContent={
                                                <Icon
                                                    className="rounded-lg p-1"
                                                    size="2rem"
                                                    style={{
                                                        color,
                                                        border: `1px solid ${color}`,
                                                    }}
                                                />
                                            }
                                        >
                                            {messageRuleNames[type]}
                                        </SelectItem>
                                    );
                                })}
                            </Select>

                            <CardSwitch
                                title="Enable this rule"
                                description={editingRule.enabled ? "This rule is active." : "This rule is inactive."}
                                defaultSelected={editingRule.enabled}
                                {...register("enabled")}
                                control={control}
                            />

                            <CardSwitch
                                title="Bail on first match"
                                description="If bailing is on and this rule matches, no further rules will be checked."
                                defaultSelected={editingRule.bail}
                                {...register("bail")}
                                control={control}
                            />

                            <Controller
                                name="mode"
                                control={control}
                                render={({ field }) => (
                                    <CardSwitch
                                        title="Invert Rule"
                                        description="If this rule matches, it will be considered a failure."
                                        defaultSelected={editingRule.mode === "invert"}
                                        onValueChange={(value) => {
                                            field.onChange(value ? "invert" : "normal");
                                        }}
                                    />
                                )}
                            />

                            <label className="mb-2 mt-3 block font-semibold">Triggers &amp; Exceptions</label>

                            <Accordion>
                                <AccordionItem key="applies_to" aria-label="Applies to" title="Applies to">
                                    <Textarea
                                        {...register("for_users", {
                                            pattern: {
                                                value: /^([0-9\n])+$/,
                                                message: "Invalid User IDs provided!",
                                            },
                                        })}
                                        maxRows={2}
                                        label="User IDs"
                                        fullWidth
                                        isInvalid={!!errors?.for_users?.message}
                                        errorMessage={errors?.for_users?.message}
                                    />
                                    <span className="mt-2 block pb-5 text-xs leading-3 text-zinc-600 dark:text-[#999]">
                                        Enter a list of user IDs separated by new lines. This rule will affect these
                                        users.
                                    </span>

                                    <Textarea
                                        {...register("for_roles", {
                                            pattern: {
                                                value: /^([0-9\n])+$/,
                                                message: "Invalid Role IDs provided!",
                                            },
                                        })}
                                        maxRows={2}
                                        label="Role IDs"
                                        fullWidth
                                        isInvalid={!!errors?.for_roles?.message}
                                        errorMessage={errors?.for_roles?.message}
                                    />
                                    <span className="mt-2 block pb-5 text-xs leading-3 text-zinc-600 dark:text-[#999]">
                                        Enter a list of role IDs separated by new lines. This rule will affect users
                                        having one of these roles.
                                    </span>

                                    <Textarea
                                        {...register("for_channels", {
                                            pattern: {
                                                value: /^([0-9\n])+$/,
                                                message: "Invalid Channel IDs provided!",
                                            },
                                        })}
                                        maxRows={2}
                                        label="Channel IDs"
                                        fullWidth
                                        isInvalid={!!errors?.for_channels?.message}
                                        errorMessage={errors?.for_channels?.message}
                                    />
                                    <span className="mt-2 block pb-4 text-xs leading-3 text-zinc-600 dark:text-[#999]">
                                        Enter a list of channel IDs separated by new lines. This rule will affect users
                                        in these channels.
                                    </span>

                                    <p className="text-sm text-zinc-600 dark:text-[#999]">
                                        If all of these fields are empty, there will be no requirement set for this rule
                                        to meet in order to execute.
                                    </p>
                                </AccordionItem>
                                <AccordionItem
                                    key="does_not_apply_to"
                                    aria-label="Does not apply to"
                                    title="Does not apply to"
                                >
                                    <Textarea
                                        {...register("excluded_users", {
                                            pattern: {
                                                value: /^([0-9\n])+$/,
                                                message: "Invalid User IDs provided!",
                                            },
                                        })}
                                        maxRows={2}
                                        label="User IDs"
                                        fullWidth
                                        isInvalid={!!errors?.excluded_users?.message}
                                        errorMessage={errors?.excluded_users?.message}
                                    />
                                    <span className="mt-2 block pb-5 text-xs leading-3 text-zinc-600 dark:text-[#999]">
                                        Enter a list of user IDs separated by new lines. This rule will not affect these
                                        users.
                                    </span>

                                    <Textarea
                                        {...register("excluded_roles", {
                                            pattern: {
                                                value: /^([0-9\n])+$/,
                                                message: "Invalid Role IDs provided!",
                                            },
                                        })}
                                        maxRows={2}
                                        label="Role IDs"
                                        fullWidth
                                        isInvalid={!!errors?.excluded_roles?.message}
                                        errorMessage={errors?.excluded_roles?.message}
                                    />
                                    <span className="mt-2 block pb-5 text-xs leading-3 text-zinc-600 dark:text-[#999]">
                                        Enter a list of role IDs separated by new lines. This rule will not affect users
                                        having one of these roles.
                                    </span>

                                    <Textarea
                                        {...register("excluded_channels", {
                                            pattern: {
                                                value: /^([0-9\n])+$/,
                                                message: "Invalid Channel IDs provided!",
                                            },
                                        })}
                                        maxRows={2}
                                        label="Channel IDs"
                                        fullWidth
                                        isInvalid={!!errors?.excluded_channels?.message}
                                        errorMessage={errors?.excluded_channels?.message}
                                    />
                                    <span className="mt-2 block pb-4 text-xs leading-3 text-zinc-600 dark:text-[#999]">
                                        Enter a list of channel IDs separated by new lines. This rule will not affect
                                        users in these channels.
                                    </span>

                                    <p className="text-sm text-zinc-600 dark:text-[#999]">
                                        If all of these fields are empty, there will be no exception set for this rule.
                                    </p>
                                </AccordionItem>
                            </Accordion>

                            <label className="mb-2 mt-3 block font-semibold">Actions</label>
                            <Controller
                                name="actions"
                                control={control}
                                render={({ field }) => (
                                    <MessageRuleActionList
                                        onChange={(changes) => {
                                            field.onChange(changes);
                                            logger.debug("MessageRuleEditModal", "Changed Actions", changes);
                                        }}
                                    />
                                )}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Cancel
                            </Button>
                            <Button color="primary" variant="flat" type="submit">
                                Done
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
