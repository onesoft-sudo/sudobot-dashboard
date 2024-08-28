"use server";

import "server-only";

import {
    ContactMailFormData,
    ContactMailFormSchema,
} from "@/components/ContactMail/ContactMailFormSchema";
import {
    DMCAFormSchema,
    GeneralHelpFormSchema,
} from "@/features/SupportForm/SupportFormSchemas";
import { SupportFormType } from "@/features/SupportForm/SupportFormType";
import env from "@/utils/env";
import { escapeMarkdown } from "@/utils/utils";
import axios from "axios";
import { headers } from "next/headers";
import { v4 as uuid } from "uuid";
import { z } from "zod";

const rateLimitCache = new Map<string, number>();

setInterval(
    () => {
        rateLimitCache.clear();
    },
    1000 * 60 * 60, // 1 hour
);

export async function sendContactMessage(data: ContactMailFormData) {
    const ip = headers().get("x-internal-ip");

    if (!ip) {
        return {
            success: false,
            message: "Cannot proceed with this request.",
        };
    }

    if (rateLimitCache.has(ip)) {
        const lastTime = rateLimitCache.get(ip) ?? 0;

        if (Date.now() - lastTime < 20_000) {
            // 20 seconds
            return {
                success: false,
                message: "You are being rate limited. Please try again later.",
            };
        }
    }

    rateLimitCache.set(ip, Date.now());

    if (!env.DISCORD_SUPPORT_WEBHOOK) {
        return {
            success: false,
            message: "No support webhook configured.",
        };
    }

    if (!ContactMailFormSchema.safeParse(data).success) {
        return {
            success: false,
            message: "Invalid data.",
        };
    }

    const form = new FormData();
    const id = uuid();

    form.set(
        "payload_json",
        JSON.stringify({
            content: `# New Support Ticket\n**Ticket ID**: ${id}\n**Subject**: ${escapeMarkdown(data.subject)}\n**Assigned To**: None\n### Submitter Information\n**Name:** ${escapeMarkdown(data.name)}\n**Email:** ${escapeMarkdown(data.email)}\n\n-# Always be careful with file attachments.`,
        }),
    );

    form.set("content", new Blob(data.message.split("")), "message.txt");

    try {
        await axios.postForm(env.DISCORD_SUPPORT_WEBHOOK, form);
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to send the message.",
        };
    }

    return {
        success: true,
    };
}

const schemas = {
    [SupportFormType.DMCA]: DMCAFormSchema,
    [SupportFormType.GenericHelp]: GeneralHelpFormSchema,
} as const;

type FormSubmission = {
    type: SupportFormType;
    data: Record<string, unknown>;
};

export async function sendFormSubmission(data: FormSubmission) {
    const ip = headers().get("x-internal-ip");

    if (!ip || !(data.type in schemas)) {
        return {
            success: false,
            message: "Cannot proceed with this request.",
        };
    }

    if (rateLimitCache.has(ip)) {
        const lastTime = rateLimitCache.get(ip) ?? 0;

        if (Date.now() - lastTime < 20_000) {
            return {
                success: false,
                message: "You are being rate limited. Please try again later.",
            };
        }
    }

    rateLimitCache.set(ip, Date.now());

    if (!env.DISCORD_SUPPORT_WEBHOOK) {
        return {
            success: false,
            message: "No support webhook configured.",
        };
    }

    const schema = schemas[data.type as keyof typeof schemas];
    const result = schema.safeParse(data.data);

    if (!result.success) {
        return {
            success: false,
            message: "Invalid data.",
        };
    }

    const form = new FormData();
    const id = uuid();

    let content = `# New Support Ticket\n**Ticket ID:** ${id}\n**Type:** ${
        data.type === SupportFormType.DMCA
            ? "DMCA Takedown Request"
            : data.type === SupportFormType.GenericHelp
              ? "General Help Request"
              : data.type === SupportFormType.BugReport
                ? "Bug Report"
                : data.type == SupportFormType.LicensingLegalSupport
                  ? "Licensing & Legal Support Request"
                  : "Unknown"
    }\n`;

    switch (data.type) {
        case SupportFormType.DMCA: {
            const dmcaData = data.data as z.infer<typeof DMCAFormSchema>;

            content += `### Submitter Information\n`;
            content += `**Name:** ${escapeMarkdown(dmcaData.name)}\n`;
            content += `**Full Legal Name:** ${escapeMarkdown(dmcaData.legalName)}\n`;
            content += `**Email:** ${escapeMarkdown(dmcaData.email)}\n\n`;
            content += `**Company Name:** ${dmcaData.companyName ? escapeMarkdown(dmcaData.companyName) : "*None*"}\n`;
            content += `**Position:** ${dmcaData.position ? escapeMarkdown(dmcaData.position) : "*None*"}\n`;
            content += `**Acting on behalf of:** ${escapeMarkdown(dmcaData.actingOnBehalfOfOther || dmcaData.actingOnBehalfOf || "None")}\n\n`;

            content += `### Signature\n${escapeMarkdown(dmcaData.signature)}\n`;
        }
    }

    content += "\n-# See the file attachment for more information.";

    form.set(
        "payload_json",
        JSON.stringify({
            content,
        }),
    );

    let blobContent = "";

    switch (data.type) {
        case SupportFormType.DMCA: {
            const dmcaData = data.data as z.infer<typeof DMCAFormSchema>;
            blobContent += `*** DMCA Takedown Request\n\n`;
            blobContent += `* URLs to the infringing content\n`;
            blobContent += dmcaData.infringingURLs.join("\n");
            blobContent += "\n\n";
            blobContent += `* URLs to the original content\n`;
            blobContent += dmcaData.originalContentURLs.join("\n");
            blobContent += "\n\n";
            blobContent += `* Description of the Infringement\n`;
            blobContent += dmcaData.description;
            blobContent += "\n\n";
        }
    }

    form.set("content", new Blob(blobContent.split("")), "message.txt");

    try {
        await axios.postForm(env.DISCORD_SUPPORT_WEBHOOK, form);
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to send the message.",
        };
    }

    return {
        success: true,
    };
}
