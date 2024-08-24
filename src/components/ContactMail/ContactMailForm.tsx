import { logger } from "@/logging/logger";
import { sendContactMessage } from "@/server/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinearProgress } from "@mui/material";
import { Button, Input, Spacer, Textarea } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { type FC } from "react";
import { Form, FormSubmitHandler, useForm } from "react-hook-form";
import { BsSend } from "react-icons/bs";
import {
    HiChevronLeft,
    HiOutlineCheckCircle,
    HiOutlineExclamationCircle,
} from "react-icons/hi2";
import {
    ContactMailFormData,
    ContactMailFormSchema,
} from "./ContactMailFormSchema";
import { useContactMail } from "./ContactMailProvider";

const ContactMailForm: FC = () => {
    const { close } = useContactMail();
    const {
        control,
        register,
        formState: { errors },
    } = useForm<ContactMailFormData>({
        resolver: zodResolver(ContactMailFormSchema),
    });
    const { mutate, reset, isPending, isSuccess, isError, error } = useMutation(
        {
            mutationFn: async (data: ContactMailFormData) => {
                const result = await sendContactMessage(data);

                if (result.success) {
                    return result;
                }

                throw new Error(result?.message ?? "Failed to send message");
            },
        },
    );

    const onSubmit: FormSubmitHandler<ContactMailFormData> = ({ data }) => {
        logger.debug(ContactMailForm.name, data);
        mutate(data);
    };

    if (isSuccess) {
        return (
            <div className="px-4 pt-3 pb-2 text-center">
                <HiOutlineCheckCircle className="text-green-500 dark:text-green-400 text-7xl block mx-auto" />
                <h3 className="text-lg font-semibold my-2">Message Sent!</h3>
                <p className="text-neutral-500 dark:text-neutral-400 pt-1 pb-3">
                    We have received your message and will get back to you soon.
                </p>
                <Button variant="flat" onClick={close} className="mx-auto">
                    Done
                </Button>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="px-4 pt-3 pb-2 text-center">
                <HiOutlineExclamationCircle className="text-red-500 dark:text-orange-400 text-7xl block mx-auto" />
                <h3 className="text-lg font-semibold my-2">
                    An error has occurred
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400 pt-1 pb-3">
                    We were unable to send your message. Please try again later.
                    {error?.message && <br />}
                    {error?.message}
                </p>
                <Button
                    variant="flat"
                    onClick={reset}
                    className="mx-auto"
                    startContent={<HiChevronLeft />}
                >
                    Go back
                </Button>
            </div>
        );
    }

    return (
        <Form control={control} onSubmit={onSubmit} noValidate>
            {isPending && <LinearProgress />}
            <Spacer y={2} />

            <div className="px-3">
                {" "}
                <Input
                    label="Name"
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                    placeholder="Enter your name"
                    variant="flat"
                    isDisabled={isPending}
                    {...register("name")}
                />
                <Spacer y={2} />
                <Input
                    label="Email"
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message}
                    placeholder="Enter your email"
                    variant="flat"
                    isDisabled={isPending}
                    {...register("email")}
                />
                <p className="text-xs text-neutral-500 dark:text-neutral-400 pt-1 pl-1">
                    We will use this email to contact you back. This will be
                    kept private.
                </p>
                <Spacer y={3} />
                <Textarea
                    label="Message"
                    isInvalid={!!errors.message}
                    errorMessage={errors.message?.message}
                    placeholder="Type your message here..."
                    variant="flat"
                    isDisabled={isPending}
                    {...register("message")}
                />
                <Spacer y={2} />
                <div className="flex justify-end items-center">
                    <Button
                        type="submit"
                        variant="flat"
                        endContent={<BsSend />}
                        isLoading={isPending}
                    >
                        Send
                    </Button>
                </div>
            </div>
        </Form>
    );
};

export default ContactMailForm;
