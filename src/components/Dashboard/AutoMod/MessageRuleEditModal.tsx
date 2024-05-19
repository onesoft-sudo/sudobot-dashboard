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
    Accordion,
    AccordionItem,
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
    for_users?: string[];
    for_roles?: string[];
    for_channels?: string[];
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
        },
    });
    const { emitter } = useConfigMutationHandlers();

    useEffect(() => {
        if (!editingRule) {
            return;
        }

        setValue("actions", editingRule.actions);
        console.log("Editing Rule", editingRule);

        const handler = () => {
            dispatch(setEditModalState({ isOpen: false, rule: null }));
        };

        emitter.on("reset", handler);

        return () => {
            emitter.off("reset", handler);
        };
    }, [editingRule]);

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
        const { actions, type, name, enabled, bail } = data;

        dispatch(setEditModalState({ isOpen: false, rule: null }));
        update({
            rules: rules.map((rule) =>
                rule.id === editingRule?.id
                    ? { ...rule, actions, type, name: name || rule.name, enabled, bail: bail ?? rule.bail }
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
                            <label className="mb-2 mt-3 block font-semibold">Triggers &amp; Exceptions</label>

                            <Accordion
                                variant="splitted"
                                itemClasses={{
                                    title: "text-base",
                                }}
                                tabIndex={-1}
                                as="div"
                                selectionMode="multiple"
                            >
                                <AccordionItem as="div" key="applies_to" aria-label="Applies to" title="Applies to">
                                    <Textarea
                                        {...register("for_users", {
                                            pattern: {
                                                value: /^([0-9\n])+$/,
                                                message: "Invalid User IDs provided!",
                                            },
                                        })}
                                        label="User IDs"
                                        fullWidth
                                        isInvalid={!!errors?.for_users?.message}
                                        errorMessage={errors?.for_users?.message}
                                    />
                                    <span className="mt-3 block text-xs leading-3 text-zinc-600 dark:text-gray-50">
                                        Enter a list of user IDs separated by new lines. This rule will affect these
                                        users.
                                    </span>
                                </AccordionItem>
                                <AccordionItem
                                    as="div"
                                    key="does_not_apply_to"
                                    aria-label="Does not apply to"
                                    title="Does not apply to"
                                >
                                    <Textarea placeholder="Users" fullWidth />
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
