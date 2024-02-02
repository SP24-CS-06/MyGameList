import { z } from "zod";

export const envBrowserSchema = z.object({
  NEXT_PUBLIC_CLIENT_ID_GOOGLE: z.string().min(1),
  NEXT_PUBLIC_SERVER_ORIGIN: z.string().min(1),
});

// client side env vars are inlined at build time, so we need to capture them in an object
const inlinedEnv = {
  NEXT_PUBLIC_CLIENT_ID_GOOGLE: process.env.NEXT_PUBLIC_CLIENT_ID_GOOGLE,
  NEXT_PUBLIC_SERVER_ORIGIN: process.env.NEXT_PUBLIC_SERVER_ORIGIN,
};

export default envBrowserSchema.parse(inlinedEnv);
