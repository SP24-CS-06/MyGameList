import "server-only";

import { z } from "zod";
import { envBrowserSchema } from "./env-browser";

const envSchema = z
  .object({
    CLIENT_SECRET_GOOGLE: z.string().min(1),
    JWT_SECRET: z.string().min(1),
    NODE_ENV: z.string().min(1),
  })
  .merge(envBrowserSchema);

export default envSchema.parse(process.env);
