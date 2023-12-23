import { initiateEmailVerification } from "@/api/routes/verify";
import { Template as VerificationEmail } from "@/emails/VerificationEmail";
import rateLimit from "@/utils/ratelimiting";
import { render } from "@react-email/render";
import { geolocation as vercelGeolocation } from "@vercel/edge";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import nodemailer, { TransportOptions } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { z } from "zod";

export const dynamic = "force-dynamic";

const geolocation = (request: NextRequest) => {
    if (process.env.NEXT_PUBLIC_ENV === "dev") {
        return {
            city: "Dhaka",
            country: "Bangladesh",
        };
    }

    return vercelGeolocation(request);
};

declare global {
    var transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
}

const schema = z.object({
    verificationToken: z.string(),
    email: z.string().email(),
    userId: z.string().regex(/^\d+$/),
});

const rateLimiter = rateLimit({
    interval: 30 * 60 * 1000,
    limit: 3,
    maxToken: 3,
});

export async function POST(request: NextRequest, response: NextResponse) {
    try {
        await rateLimiter.check("CACHE_TOKEN");
    } catch (error) {
        console.log(error);

        if (error instanceof NextResponse) {
            return error;
        }

        return new NextResponse(
            JSON.stringify({ error: "Rate limit exceeded" }),
            {
                status: 429,
            }
        );
    }

    const json: z.infer<typeof schema> = await request
        .json()
        .catch(console.log);

    if (!schema.safeParse(json).success) {
        return NextResponse.json(
            {
                error: "Required fields are missing",
            },
            {
                status: 400,
            }
        );
    }

    const { email, userId, verificationToken } = json;
    let info;

    try {
        info = await initiateEmailVerification(
            verificationToken,
            userId,
            email,
            process.env.FRONTEND_AUTH_KEY!
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                error: "Invalid credentials",
                description:
                    error instanceof AxiosError ? error.response?.data : null,
            },
            {
                status: 400,
            }
        );
    }

    const {
        guildName: guild,
        guildId,
        token,
        meta: { emailVerificationToken },
    } = info.data.data;
    const { city, country } = geolocation(request);

    const html = render(
        VerificationEmail({
            address: `${city}, ${country}`,
            email,
            guild,
            ip: request.ip ?? "127.0.0.1",
            verificationURL: `${
                process.env.NEXT_PUBLIC_API_URL
            }/verify/email?t=${encodeURIComponent(
                token
            )}&g=${guildId}&u=${userId}&et=${encodeURIComponent(
                emailVerificationToken
            )}`,
        })
    );

    const transporter =
        global.transporter ??
        nodemailer.createTransport({
            host: process.env.EMAIL_SERVER!,
            port: 587,
            secure: false,
            auth: {
                type: "login",
                user: process.env.EMAIL_USERNAME!,
                pass: process.env.EMAIL_PASSWORD!,
            },
        } as TransportOptions);

    global.transporter ??= transporter;

    await transporter.sendMail({
        subject: "Verification",
        html,
        from: {
            address: process.env.EMAIL_USERNAME!,
            name: "SudoBot",
        },
        to: email,
        attachments: [
            {
                cid: "logo",
                path: "https://raw.githubusercontent.com/onesoft-sudo/sudobot-dashboard/main/src/images/logo.png",
                contentDisposition: "inline",
                contentType: "image/png",
            },
        ],
    });

    return NextResponse.json({
        status: "Verification initiated",
    });
}
