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
    for_users?: string;
    for_roles?: string;
    for_channels?: string;
    excluded_users?: string;
    excluded_roles?: string;
    excluded_channels?: string;
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
        setValue("name", editingRule.name);
        setValue("excluded_channels", editingRule.exceptions?.channels?.join("\n"));
        setValue("excluded_roles", editingRule.exceptions?.roles?.join("\n"));
        setValue("excluded_users", editingRule.exceptions?.users?.join("\n"));
        setValue("for_channels", editingRule.for?.channels?.join("\n"));
        setValue("for_roles", editingRule.for?.roles?.join("\n"));
        setValue("for_users", editingRule.for?.users?.join("\n"));

        logger.debug("MessageRuleEditModal", "Editing Rule", editingRule);

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
        const {
            actions,
            type,
            name,
            enabled,
            bail,
            mode,
            excluded_channels,
            excluded_roles,
            excluded_users,
            for_channels,
            for_roles,
            for_users,
        } = data;

        dispatch(setEditModalState({ isOpen: false, rule: null }));
        update({
            rules: rules.map((rule) =>
                rule.id === editingRule?.id
                    ? {
                          ...rule,
                          actions,
                          type,
                          name: name || rule.name,
                          enabled,
                          bail: bail ?? rule.bail,
                          mode,
                          for:
                              for_users || for_roles || for_channels
                                  ? {
                                        channels: for_channels?.split(/ *\n */) ?? rule.for?.channels,
                                        roles: for_roles?.split(/ *\n */) ?? rule.for?.roles,
                                        users: for_users?.split(/ *\n */) ?? rule.for?.users,
                                    }
                                  : undefined,
                          exceptions:
                              excluded_users || excluded_roles || excluded_channels
                                  ? {
                                        channels: excluded_channels?.split(/ *\n */) ?? rule.exceptions?.channels,
                                        roles: excluded_roles?.split(/ *\n */) ?? rule.exceptions?.roles,
                                        users: excluded_users?.split(/ *\n */) ?? rule.exceptions?.users,
                                    }
                                  : undefined,
                      }
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
                                    <Controller
                                        name="for_users"
                                        control={control}
                                        defaultValue={editingRule?.for?.users?.join("\n")}
                                        rules={{
                                            pattern: {
                                                value: /^([0-9\n])+$/,
                                                message: "Invalid User IDs provided!",
                                            },
                                        }}
                                        render={({ field, fieldState }) => (
                                            <Textarea
                                                defaultValue={editingRule?.for?.users?.join("\n")}
                                                maxRows={2}
                                                label="User IDs"
                                                fullWidth
                                                isInvalid={!!fieldState.error?.message}
                                                errorMessage={fieldState?.error?.message}
                                                ref={field.ref}
                                                onChange={field.onChange}
                                                onBlur={field.onBlur}
                                            />
                                        )}
                                    />
                                    <span className="mt-2 block pb-5 text-xs leading-3 text-zinc-600 dark:text-[#999]">
                                        Enter a list of user IDs separated by new lines. This rule will affect these
                                        users.
                                    </span>

                                    <Controller
                                        name="for_roles"
                                        control={control}
                                        defaultValue={editingRule?.for?.roles?.join("\n")}
                                        rules={{
                                            pattern: {
                                                value: /^([0-9\n])+$/,
                                                message: "Invalid Role IDs provided!",
                                            },
                                        }}
                                        render={({ field, fieldState }) => (
                                            <Textarea
                                                defaultValue={editingRule?.for?.roles?.join("\n")}
                                                maxRows={2}
                                                label="Role IDs"
                                                fullWidth
                                                isInvalid={!!fieldState.error?.message}
                                                errorMessage={fieldState?.error?.message}
                                                ref={field.ref}
                                                onChange={field.onChange}
                                                onBlur={field.onBlur}
                                            />
                                        )}
                                    />
                                    <span className="mt-2 block pb-5 text-xs leading-3 text-zinc-600 dark:text-[#999]">
                                        Enter a list of role IDs separated by new lines. This rule will affect users
                                        having one of these roles.
                                    </span>

                                    <Controller
                                        name="for_channels"
                                        control={control}
                                        defaultValue={editingRule?.for?.channels?.join("\n")}
                                        rules={{
                                            pattern: {
                                                value: /^([0-9\n])+$/,
                                                message: "Invalid Channel IDs provided!",
                                            },
                                        }}
                                        render={({ field, fieldState }) => (
                                            <Textarea
                                                defaultValue={editingRule?.for?.channels?.join("\n")}
                                                maxRows={2}
                                                label="Channel IDs"
                                                fullWidth
                                                isInvalid={!!fieldState.error?.message}
                                                errorMessage={fieldState?.error?.message}
                                                ref={field.ref}
                                                onChange={field.onChange}
                                                onBlur={field.onBlur}
                                            />
                                        )}
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
                                    <Controller
                                        name="excluded_users"
                                        control={control}
                                        defaultValue={editingRule?.exceptions?.users?.join("\n")}
                                        rules={{
                                            pattern: {
                                                value: /^([0-9\n])+$/,
                                                message: "Invalid User IDs provided!",
                                            },
                                        }}
                                        render={({ field, fieldState }) => (
                                            <Textarea
                                                defaultValue={editingRule?.exceptions?.users?.join("\n")}
                                                maxRows={2}
                                                label="User IDs"
                                                fullWidth
                                                isInvalid={!!fieldState.error?.message}
                                                errorMessage={fieldState?.error?.message}
                                                ref={field.ref}
                                                onChange={field.onChange}
                                                onBlur={field.onBlur}
                                            />
                                        )}
                                    />
                                    <span className="mt-2 block pb-5 text-xs leading-3 text-zinc-600 dark:text-[#999]">
                                        Enter a list of user IDs separated by new lines. This rule will not affect these
                                        users.
                                    </span>

                                    <Controller
                                        name="excluded_roles"
                                        control={control}
                                        defaultValue={editingRule?.exceptions?.roles?.join("\n")}
                                        rules={{
                                            pattern: {
                                                value: /^([0-9\n])+$/,
                                                message: "Invalid Role IDs provided!",
                                            },
                                        }}
                                        render={({ field, fieldState }) => (
                                            <Textarea
                                                defaultValue={editingRule?.exceptions?.roles?.join("\n")}
                                                maxRows={2}
                                                label="Role IDs"
                                                fullWidth
                                                isInvalid={!!fieldState.error?.message}
                                                errorMessage={fieldState?.error?.message}
                                                ref={field.ref}
                                                onChange={field.onChange}
                                                onBlur={field.onBlur}
                                            />
                                        )}
                                    />
                                    <span className="mt-2 block pb-5 text-xs leading-3 text-zinc-600 dark:text-[#999]">
                                        Enter a list of role IDs separated by new lines. This rule will not affect users
                                        having one of these roles.
                                    </span>

                                    <Controller
                                        name="excluded_channels"
                                        control={control}
                                        defaultValue={editingRule?.exceptions?.channels?.join("\n")}
                                        rules={{
                                            pattern: {
                                                value: /^([0-9\n])+$/,
                                                message: "Invalid Channel IDs provided!",
                                            },
                                        }}
                                        render={({ field, fieldState }) => (
                                            <Textarea
                                                defaultValue={editingRule?.exceptions?.channels?.join("\n")}
                                                maxRows={2}
                                                label="Channel IDs"
                                                fullWidth
                                                isInvalid={!!fieldState.error?.message}
                                                errorMessage={fieldState?.error?.message}
                                                ref={field.ref}
                                                onChange={field.onChange}
                                                onBlur={field.onBlur}
                                            />
                                        )}
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
