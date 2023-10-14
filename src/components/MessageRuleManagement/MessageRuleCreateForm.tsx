import { APIMessageRule } from "@/types/APIMessageRule";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import MessageRuleIcon from "./MessageRuleIcon";

interface MessageRuleCreateFormProps {
    onSubmit?: () => any;
    onCancel?: () => any;
}
type Type = APIMessageRule["type"];

const nameRecord: Record<Type, string> = {
    anti_invite: "Anti Invite",
    block_mass_mention: "Block Mass Mention",
    block_repeated_text: "Block Repeated Text",
    blocked_file_extension: "Block File with Specific Extensions",
    blocked_mime_type: "Block Specific File Types",
    domain: "Block Domains",
    regex_filter: "Regex (Block)",
    regex_must_match: "Regex (Must match)",
};

const names = (Object.entries(nameRecord) as [Type, string][]).map(
    ([type, name]) => ({ type, name })
);

const MessageRuleCreateForm: FC<MessageRuleCreateFormProps> = ({
    onCancel,
    onSubmit = () => null,
}) => {
    const {
        formState: { errors },
        register,
        handleSubmit,
    } = useForm();
    const [ruleType, setRuleType] = useState<Type>();

    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Select
                    items={names}
                    label="Rule Type"
                    placeholder="Select a message rule type"
                    labelPlacement="outside"
                    {...register("a", {
                        required: {
                            message: "Please enter a valid rule type!",
                            value: true,
                        },
                        onChange: e => {
                            if (e.target.value) {
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
                    }}
                    renderValue={rules => {
                        console.log(rules.map(r => r));

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
                            key={index}
                            title={rule.name}
                            className="relative"
                            description={rule.type}
                            startContent={
                                <MessageRuleIcon type={rule.type} size={25} />
                            }
                        />
                    ))}
                </Select>
            </div>

            <div className="flex items-center justify-end gap-2 mt-3 pb-3">
                <Button
                    variant="flat"
                    type="reset"
                    color="danger"
                    onPress={onCancel}
                >
                    Cancel
                </Button>
                <Button variant="flat" type="submit" color="primary">
                    Create
                </Button>
            </div>
        </form>
    );
};

export default MessageRuleCreateForm;
