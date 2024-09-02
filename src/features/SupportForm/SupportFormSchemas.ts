import { z } from "zod";

const CommonSchema = z.object({
    name: z
        .string({ required_error: "Please enter your name!" })
        .min(1, "Please enter your name!")
        .max(255, "Name is too long!"),
    email: z
        .string({ required_error: "Please enter your email!" })
        .email("Please enter a valid email!")
        .max(255, "Email is too long!"),
});

export const GeneralHelpFormSchema = CommonSchema.extend({
    subject: z
        .string({ message: "Please enter the subject!" })
        .min(1, "Please enter the subject!")
        .max(255, "Subject is too long!"),
    type: z
        .string({ message: "Please select a type!" })
        .min(1, "Please select a type!")
        .max(255, "Type is too long!"),
    description: z
        .string({ message: "Please enter the description!" })
        .min(1, "Please enter the description!")
        .max(1024 * 16, "Description is too long!"),
    platform: z
        .string({ message: "Please select a platform!" })
        .min(1, "Please select a platform!")
        .max(255, "Platform is too long!"),
    interpreter: z
        .string({ message: "Please select an interpreter!" })
        .min(1, "Please select an interpreter!")
        .max(255, "Interpreter is too long!"),
});
export const DMCAFormSchema = CommonSchema.extend({
    infringingURLs: z
        .array(
            z
                .string({
                    required_error: "Please enter the infringing URLs",
                })
                .url("Please make sure the URLs are valid"),
            {
                required_error: "Please enter the infringing URLs!",
            },
        )
        .nonempty("Please enter at least one infringing URL!"),
    originalContentURLs: z
        .array(
            z
                .string({
                    required_error: "Please enter the original content URLs",
                })
                .url("Please make sure the URLs are valid"),
            {
                required_error: "Please enter the original content URLs!",
            },
        )
        .nonempty("Please enter at least one original content URL!"),
    legalName: z
        .string({ required_error: "Please enter your legal name!" })
        .min(1, "Please enter your legal name!")
        .max(255, "Legal name is too long!"),
    companyName: z.string().max(255, "Company name is too long!").optional(),
    position: z.string().max(255, "Position is too long!").optional(),
    description: z
        .string({ required_error: "Please enter the description!" })
        .min(1, "Please enter the description!")
        .max(1024 * 16, "Description is too long!"),
    actingOnBehalfOf: z
        .string({ required_error: "Please select an option!" })
        .min(1, "Please select an option!"),
    actingOnBehalfOfOther: z
        .string()
        .max(255, "Value for this field is too long!")
        .optional(),
    signature: z
        .string({ required_error: "Please enter your signature!" })
        .min(1, "Please enter your signature!")
        .max(255, "Signature is too long!"),
});
