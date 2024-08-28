import { Input, Spacer } from "@nextui-org/react";
import {
    Control,
    FieldValues,
    FormState,
    Path,
    UseFormRegister,
} from "react-hook-form";

type CommonFieldsProps<T extends FieldValues> = {
    control: Control<T>;
    register: UseFormRegister<T>;
    formState: FormState<T>;
};

const CommonFields = <T extends FieldValues>({
    control,
    register,
    formState,
}: CommonFieldsProps<T>) => {
    return (
        <>
            <Input
                label="Your name"
                isInvalid={Boolean(formState.errors.name)}
                errorMessage={formState.errors.name?.message?.toString()}
                {...register("name" as Path<T>)}
            />
            <Spacer y={2} />
            <Input
                label="Email address"
                isInvalid={Boolean(formState.errors.email)}
                errorMessage={formState.errors.email?.message?.toString()}
                {...register("email" as Path<T>)}
            />
            <p className="text-[#999] text-xs ml-1 mt-1">
                We&rsquo;ll use this email address to contact you back if
                necessary.
            </p>
            <div className="w-full h-[1px] bg-neutral-300 dark:bg-neutral-700 block my-5"></div>
        </>
    );
};

export default CommonFields;
