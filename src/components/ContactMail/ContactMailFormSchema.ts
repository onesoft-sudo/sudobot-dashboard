import { z } from "zod";

export const ContactMailFormSchema = z.object({
    name: z
        .string({ required_error: "Please enter your name!" })
        .min(1, "Please enter your name!")
        .max(128, "Your name must be at most 128 characters long!"),
    subject: z
        .string({ required_error: "Please enter a subject!" })
        .min(1, "Please enter a subject!")
        .max(256, "Your subject must be at most 256 characters long!"),
    email: z
        .string({
            required_error:
                "Please enter your email address so we can contact you back!",
        })
        .email("Please enter a valid email address!")
        .max(128, "Your email must be at most 128 characters long!"),
    message: z
        .string({
            required_error: "Please type your message here so we can help you!",
        })
        .min(10, "Your message must be at least 10 characters long!")
        .max(8192, "Your message must be at most 8192 characters long!"),
});

export type ContactMailFormData = z.infer<typeof ContactMailFormSchema>;
