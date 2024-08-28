import { zodResolver } from "@hookform/resolvers/zod";
import { type FC } from "react";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import CommonFields from "./CommonFields";
import SubmitButton from "./SubmitButton";
import { GeneralHelpFormSchema } from "./SupportFormSchemas";

type GeneralHelpFormProps = {};

const GeneralHelpForm: FC<GeneralHelpFormProps> = (props) => {
    const { control, register, formState } = useForm<
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
            <SubmitButton />
        </Form>
    );
};

export default GeneralHelpForm;
