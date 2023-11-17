import useAuthWithCheck from "@/hooks/useAuthWithCheck";
import { APIMessageRule } from "@/types/APIMessageRule";
import {
    Button,
    ModalBody,
    ModalFooter,
    Select,
    SelectItem,
    Textarea,
} from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { FC, useRef, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import styles from "../../styles/MessageRuleCreateForm.module.css";
import MessageRuleCreateFormCommons from "./MessageRuleCreateFormCommons";
import MessageRuleIcon from "./MessageRuleIcon";
import MassMentionRuleWizard from "./RuleCreationWizards/MassMentionRuleWizard";

interface MessageRuleCreateFormProps {
    onCancel?: () => any;
    onDone?: () => any;
}

type RuleType = APIMessageRule["type"];

type ForEachRuleType<V> = {
    [K in RuleType]?: V;
};

const nameRecord: Record<RuleType, string> = {
    anti_invite: "Anti Invite",
    block_mass_mention: "Mass Mention",
    block_repeated_text: "Repeated Text",
    blocked_file_extension: "File with Specific Extensions",
    blocked_mime_type: "Specific File Types",
    domain: "Domains",
    regex_filter: "Regex (Block)",
    regex_must_match: "Regex (Must match)",
};

const parameterNames = {
    anti_invite: "Invite Links",
    block_mass_mention: null,
    block_repeated_text: null,
    blocked_file_extension: "File Extensions",
    blocked_mime_type: "Mime-Types",
    domain: "Domains",
    regex_filter: "Regex Patterns",
    regex_must_match: "Regex Patterns",
} satisfies Record<RuleType, string | null>;

const wizards: ForEachRuleType<FC<UseFormReturn>> = {
    block_mass_mention: MassMentionRuleWizard,
};

const names = (Object.entries(nameRecord) as [RuleType, string][]).map(
    ([type, name]) => ({ type, name })
);

const MessageRuleCreateForm: FC<MessageRuleCreateFormProps> = ({
    onCancel,
    onDone,
}) => {
    const useFormResult = useForm({
        defaultValues: {
            actions: [],
            immune_roles: [],
            immune_users: [],
        } as Record<string, any>,
    });
    const {
        formState: { errors },
        register,
        handleSubmit,
    } = useFormResult;
    const [ruleType, setRuleType] = useState<RuleType>();
    const Wizard = ruleType ? wizards[ruleType] : null;
    const { user } = useAuthWithCheck();
    const mutation = useMutation({
        mutationFn: data => {
            // createMessageRule(user?.token ?? '', data)
            // FIXME
            console.log("Data", data);
            return {} as any;
        },
        onSuccess() {
            console.log("Success");
            onDone?.();
        },
    });

    const submitRef = useRef<HTMLButtonElement>(null);

    const onSubmit = (data: any) => {
        mutation.mutate(data);
    };

    return (
        <>
            <ModalBody className={styles.modalBody}>
                <form
                    noValidate
                    onSubmit={event => {
                        event.preventDefault();
                        event.stopPropagation();
                        handleSubmit(onSubmit)(event);
                        return false;
                    }}
                >
                    <div>
                        <Select
                            items={names}
                            label="Rule Type"
                            placeholder="Select a message rule type"
                            labelPlacement="outside"
                            {...register("type", {
                                required: {
                                    message: "Please enter a valid rule type!",
                                    value: true,
                                },
                                onChange: e => {
                                    if (e.target.value) {
                                        console.log("Set", e.target.value);
                                        setRuleType(e.target.value);
                                    }
                                },
                                value: ruleType,
                            })}
                            selectedKeys={ruleType ? [ruleType] : []}
                            classNames={{
                                popover: "[overflow-wrap:break-word]",
                                innerWrapper: "[overflow-wrap:break-word]",
                                value: "[overflow-wrap:break-word]",
                                description: "[overflow-wrap:break-word]",
                            } as any}
                            renderValue={rules => {
                                return rules.map((rule, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3"
                                    >
                                        <div>{rule.props?.startContent}</div>
                                        <div>{rule.textValue}</div>
                                    </div>
                                ));
                            }}
                        >
                            {names.map((rule, index) => (
                                <SelectItem
                                    key={rule.type}
                                    title={rule.name}
                                    className="relative"
                                    description={rule.type}
                                    startContent={
                                        <MessageRuleIcon
                                            type={rule.type}
                                            size={25}
                                        />
                                    }
                                />
                            ))}
                        </Select>
                        <div className="text-red-500 text-xs pt-1">
                            {errors.type?.message?.toString() ?? ""}
                        </div>

                        <div className="pt-4"></div>

                        {ruleType && (
                            <MessageRuleCreateFormCommons
                                {...useFormResult}
                                noParams={
                                    !ruleType ||
                                    parameterNames[ruleType] === null
                                }
                            >
                                <>
                                    {parameterNames[ruleType] !== null && (
                                        <>
                                            <div className="pt-4"></div>
                                            <div>
                                                <Textarea
                                                    type="text"
                                                    label={
                                                        parameterNames[ruleType]
                                                    }
                                                    variant="flat"
                                                    minRows={2}
                                                    labelPlacement="outside"
                                                    placeholder={"Type here..."}
                                                    {...register("data")}
                                                />
                                            </div>
                                        </>
                                    )}
                                    {Wizard && (
                                        <>
                                            <div className="pt-4"></div>
                                            <Wizard {...useFormResult} />
                                        </>
                                    )}
                                </>
                            </MessageRuleCreateFormCommons>
                        )}
                    </div>

                    <div className="flex items-center justify-end gap-2 mt-3 pb-3">
                        <button
                            className="hidden"
                            type="submit"
                            ref={submitRef}
                        ></button>
                    </div>
                </form>
            </ModalBody>

            <ModalFooter className="[border-top:1px_solid_rgba(255,255,255,0.1)]">
                <Button
                    variant="flat"
                    type="reset"
                    color="danger"
                    onPress={onCancel}
                    isDisabled={mutation.isLoading}
                >
                    Cancel
                </Button>
                <Button
                    variant="flat"
                    onClick={() => submitRef.current?.click()}
                    color="primary"
                    isDisabled={mutation.isLoading}
                >
                    Create
                </Button>
            </ModalFooter>
        </>
    );
};

export default MessageRuleCreateForm;
