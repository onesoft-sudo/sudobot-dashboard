import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Select, SelectItem, Spacer, Textarea } from "@nextui-org/react";
import { type FC } from "react";
import { Controller, Form, useForm } from "react-hook-form";
import { z } from "zod";
import CommonFields from "./CommonFields";
import SubmitButton from "./SubmitButton";
import { GeneralHelpFormSchema } from "./SupportFormSchemas";

type GeneralHelpFormProps = {};

const GeneralHelpForm: FC<GeneralHelpFormProps> = (props) => {
    const { control, register, formState, watch } = useForm<
        z.infer<typeof GeneralHelpFormSchema>
    >({
        resolver: zodResolver(GeneralHelpFormSchema),
    });

    return (
        <Form control={control}>
            <CommonFields
                control={control}
                register={register}
                formState={formState}
            />

            <Controller
                name="type"
                control={control}
                render={({ field, fieldState }) => (
                    <Select
                        label="What type of help do you need?"
                        name="type"
                        selectionMode="single"
                        defaultSelectedKeys={field.value}
                        onSelectionChange={(keys) =>
                            field.onChange(
                                Array.from(keys as unknown as Set<string>)[0] ||
                                    null,
                            )
                        }
                        isInvalid={fieldState.invalid}
                        errorMessage={fieldState.error?.message?.toString()}
                    >
                        <SelectItem key="getting_started">
                            Getting started or Setting up SudoBot
                        </SelectItem>
                        <SelectItem key="troubleshooting">
                            Troubleshooting or General Support
                        </SelectItem>
                        <SelectItem key="other">Other</SelectItem>
                    </Select>
                )}
            />

            <Spacer y={2} />

            <Input
                label="Subject"
                isInvalid={Boolean(formState.errors.subject)}
                errorMessage={formState.errors.subject?.message?.toString()}
                placeholder="How can we help you?"
                {...register("subject")}
            />

            <Spacer y={2} />

            {watch("type") !== "other" && (
                <>
                    <Controller
                        name="platform"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Select
                                label="Platform"
                                name="platform"
                                selectionMode="single"
                                defaultSelectedKeys={field.value}
                                onSelectionChange={(keys) =>
                                    field.onChange(
                                        Array.from(
                                            keys as unknown as Set<string>,
                                        )[0] || null,
                                    )
                                }
                                isInvalid={fieldState.invalid}
                                errorMessage={fieldState.error?.message?.toString()}
                            >
                                <SelectItem key="linux-x86_64">
                                    Linux x86_64
                                </SelectItem>

                                <SelectItem key="linux-i386">
                                    Linux i386
                                </SelectItem>

                                <SelectItem key="linux-arm64">
                                    Linux arm64
                                </SelectItem>

                                <SelectItem key="linux-armhf">
                                    Linux armhf
                                </SelectItem>

                                <SelectItem key="darwin-x86_64">
                                    macOS x86_64
                                </SelectItem>

                                <SelectItem key="darwin-arm64">
                                    macOS arm64 (Apple Silicon)
                                </SelectItem>

                                <SelectItem key="windows-x86_64">
                                    Windows x64 (64-bit)
                                </SelectItem>

                                <SelectItem key="windows-i386">
                                    Windows x86 (32-bit)
                                </SelectItem>

                                <SelectItem key="windows-arm64">
                                    Windows arm64
                                </SelectItem>

                                <SelectItem key="other">
                                    Other (please specify in description)
                                </SelectItem>
                            </Select>
                        )}
                    />

                    <Spacer y={2} />

                    <Controller
                        name="interpreter"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Select
                                label="JavaScript Interpreter"
                                name="interpreter"
                                selectionMode="single"
                                defaultSelectedKeys={field.value}
                                onSelectionChange={(keys) =>
                                    field.onChange(
                                        Array.from(
                                            keys as unknown as Set<string>,
                                        )[0] || null,
                                    )
                                }
                                isInvalid={fieldState.invalid}
                                errorMessage={fieldState.error?.message?.toString()}
                            >
                                <SelectItem key="bun">Bun</SelectItem>
                                <SelectItem key="node">Node.js</SelectItem>
                            </Select>
                        )}
                    />

                    <Spacer y={2} />
                </>
            )}

            <Textarea
                label="Description"
                isInvalid={Boolean(formState.errors.description)}
                errorMessage={formState.errors.description?.message?.toString()}
                placeholder="Describe your issue or question in detail"
                {...register("description")}
            />

            <SubmitButton />
        </Form>
    );
};

export default GeneralHelpForm;
