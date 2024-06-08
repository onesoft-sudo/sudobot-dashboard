"use server";

import "server-only";

import { Route } from "@/api/Routes";
import { getAxiosClient } from "@/client/axios";
import GuildEmailVerificationMail from "@/mails/GuildEmailVerificationMail";
import env from "@/utils/env";
import { render } from "@react-email/render";
import { AxiosError } from "axios";
import nodemailer from "nodemailer";

const rateLimitCache = new Map<string, number>();

setInterval(
    () => {
        rateLimitCache.clear();
    },
    1000 * 60 * 60,
);

const baseUrl =
    process.env.NEXT_PUBLIC_FRONTEND_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const initiateEmailVerification = async (token: string, email: string) => {
    if (rateLimitCache.has(email)) {
        const lastTime = rateLimitCache.get(email) ?? 0;

        if (Date.now() - lastTime < 20_000) {
            // 20 seconds
            return {
                success: false,
                error: "You are being rate limited. Please try again later.",
                type: "rate_limit",
            };
        }
    }

    rateLimitCache.set(email, Date.now());

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email ?? "")) {
        return {
            success: false,
            error: "Invalid email address.",
        };
    }

    try {
        const response = await getAxiosClient().post(
            Route.VERIFICATION_INITIATE_EMAIL,
            {
                token,
                email,
            },
            {
                headers: {
                    "x-frontend-key": env.FRONTEND_KEY,
                },
            },
        );

        try {
            const transporter = nodemailer.createTransport({
                host: env.EMAIL_SMTP_HOST,
                port: 465,
                secure: true,
                auth: {
                    user: env.EMAIL_SMTP_USERNAME,
                    pass: env.EMAIL_SMTP_PASSWORD,
                },
            });

            const emailHtml = render(
                GuildEmailVerificationMail({
                    emailToken: response.data.emailToken,
                    email,
                    guildName: response.data.guild.name,
                }),
            );

            await transporter.sendMail({
                from: `SudoBot <${env.EMAIL_SMTP_USERNAME}>`,
                to: email,
                subject: "Verify your email address",
                html: emailHtml,
                attachments: [
                    {
                        cid: "logo",
                        contentType: "image/png",
                        path: baseUrl + "/logo.png",
                    },
                ],
            });

            return {
                success: true,
                data: {
                    email,
                },
            };
        } catch (error) {
            console.error("Error sending email", error);

            return {
                success: false,
                error: "Failed to deliver the email. Please double check your email address.",
            };
        }
    } catch (error) {
        if (error instanceof AxiosError && error.response?.data.error) {
            return {
                success: false,
                error: error.response?.data.error,
            };
        }

        return {
            success: false,
            error: "An unknown error occurred. Please try again later.",
        };
    }
};
