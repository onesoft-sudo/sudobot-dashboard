import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Radio, RadioGroup, Spacer, Textarea } from "@nextui-org/react";
import clsx from "clsx";
import { useRef, useState, type FC } from "react";
import { Controller, Form, useForm } from "react-hook-form";
import { z } from "zod";
import CommonFields from "./CommonFields";
import DMCASwornStatements from "./DMCASwornStatements";
import SubmitButton from "./SubmitButton";
import { DMCAFormSchema } from "./SupportFormSchemas";

type DMCAFormProps = {};

const DMCAForm: FC<DMCAFormProps> = (props) => {
    const [swornStatementsError, setSwornStatementsError] = useState<
        string | null
    >(null);
    const { control, register, formState } = useForm<
        z.infer<typeof DMCAFormSchema>
    >({
        resolver: zodResolver(DMCAFormSchema),
    });
    const swornStatementsRef = useRef<[boolean, boolean, boolean]>([
        false,
        false,
        false,
    ]);

    const handleSubmit = ({
        data,
    }: {
        data: z.infer<typeof DMCAFormSchema>;
    }) => {
        if (!swornStatementsRef.current.every(Boolean)) {
            setSwornStatementsError(
                "Please agree to all the sworn statements.",
            );
            return;
        }

        setSwornStatementsError(null);
        console.log(data);
    };

    return (
        <Form control={control} onSubmit={handleSubmit}>
            <CommonFields
                control={control}
                register={register}
                formState={formState}
            />

            <h2 className="text-2xl">Details of the Infringement</h2>
            <p className="text-[#999] text-sm mb-5">
                Please provide the following details about the infringement.
            </p>

            <Controller
                name="infringingURLs"
                control={control}
                render={({ field, fieldState }) => (
                    <Textarea
                        label="Infringing URLs"
                        isInvalid={Boolean(fieldState.error)}
                        errorMessage={fieldState.error?.message?.toString()}
                        onBlur={field.onBlur}
                        onValueChange={(value) => {
                            field.onChange(
                                (value || "")
                                    .split("\n")
                                    .map((str) => str.trim())
                                    .filter(Boolean),
                            );
                        }}
                    />
                )}
            />
            <p className="text-[#999] text-xs ml-1 mt-1">
                Please enter the URLs that are infringing your content. You can
                enter multiple URLs by separating them with a new line.
                <br />
                If the infringing content is a Discord Message, please provide
                the message link.
            </p>

            <Spacer y={3} />
            <Controller
                name="originalContentURLs"
                control={control}
                render={({ field, fieldState }) => (
                    <Textarea
                        label="URLs to the Original Content"
                        isInvalid={Boolean(fieldState.error)}
                        errorMessage={fieldState.error?.message?.toString()}
                        onBlur={field.onBlur}
                        onValueChange={(value) => {
                            field.onChange(
                                (value || "")
                                    .split("\n")
                                    .map((str) => str.trim())
                                    .filter(Boolean),
                            );
                        }}
                    />
                )}
            />
            <p className="text-[#999] text-xs ml-1 mt-1">
                Please enter the URLs to the original content. You can enter
                multiple URLs by separating them with a new line.
            </p>

            <Spacer y={3} />
            <Textarea
                label="Description of the Infringement"
                isInvalid={Boolean(formState.errors.description)}
                errorMessage={formState.errors.description?.message?.toString()}
                {...register("description")}
            />

            <h2 className="text-2xl mt-7">Your Information</h2>
            <p className="text-[#999] text-sm mb-5">
                Please provide your information below.
            </p>

            <Spacer y={3} />
            <Input
                label="Your Full Legal Name"
                isInvalid={Boolean(formState.errors.legalName)}
                errorMessage={formState.errors.legalName?.message?.toString()}
                {...register("legalName")}
            />

            <Spacer y={3} />
            <Input
                label="Your Company Name (if applicable)"
                isInvalid={Boolean(formState.errors.companyName)}
                errorMessage={formState.errors.companyName?.message?.toString()}
                {...register("companyName")}
            />

            <Spacer y={3} />
            <Input
                label="Your Position in the Company (if applicable)"
                isInvalid={Boolean(formState.errors.position)}
                errorMessage={formState.errors.position?.message?.toString()}
                {...register("position")}
            />

            <Spacer y={3} />
            <Controller
                name="actingOnBehalfOf"
                control={control}
                render={({ field, fieldState }) => (
                    <>
                        <RadioGroup
                            label="I am acting on behalf of:"
                            isInvalid={Boolean(fieldState.error)}
                            errorMessage={fieldState.error?.message?.toString()}
                            onValueChange={field.onChange}
                        >
                            <Radio value="myself">Myself</Radio>
                            <Radio value="company">My Company</Radio>
                            <Radio value="client">My Client</Radio>
                            <Radio value="other">
                                Other (please specify below)
                            </Radio>
                        </RadioGroup>

                        <Input
                            label="On behalf of"
                            isInvalid={Boolean(
                                formState.errors.actingOnBehalfOfOther,
                            )}
                            errorMessage={formState.errors.actingOnBehalfOfOther?.message?.toString()}
                            className={clsx(
                                "mt-3",
                                field.value === "other" ? "" : "hidden",
                            )}
                            {...register("actingOnBehalfOfOther")}
                        />
                    </>
                )}
            />

            <Spacer y={5} />
            <DMCASwornStatements
                onValueChange={(index, values) => {
                    swornStatementsRef.current[index] = values;
                }}
            />
            {swornStatementsError && (
                <p className="text-red-500 text-sm mt-2">
                    {swornStatementsError}
                </p>
            )}

            <Spacer y={5} />
            <h2 className="text-2xl">Signature</h2>
            <p className="text-[#999] text-sm mb-5">Please sign this form.</p>

            <Spacer y={3} />
            <Input
                label="Your Signature"
                isInvalid={Boolean(formState.errors.signature)}
                errorMessage={formState.errors.signature?.message?.toString()}
                {...register("signature")}
            />

            <SubmitButton />
        </Form>
    );
};

export default DMCAForm;
