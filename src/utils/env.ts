import { z } from "zod";

const schema = z.object({
    NODE_ENV: z.string().default("production"),
});

export default schema.parse(process.env);
