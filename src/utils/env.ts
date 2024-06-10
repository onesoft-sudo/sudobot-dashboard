import { z } from "zod";

const schema = z.object({
    NODE_ENV: z.string().default("production"),
    FRONTEND_KEY: z.string().default(Math.random().toString(36).substring(7)),
    EMAIL_SMTP_HOST: z.string(),
    EMAIL_SMTP_USERNAME: z.string(),
    EMAIL_NOREPLY_ADDRESS: z.string(),
    EMAIL_SMTP_PASSWORD: z.string(),
    UNDER_CLOUDFLARE: z.enum(["1", "0"]).default("0"),
    TRUST_PROXY: z.enum(["1", "0"]).default("0"),
});

export default schema.parse(process.env);
