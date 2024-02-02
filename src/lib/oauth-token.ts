import { z } from "zod";

export const payloadSchema = z.object({});

export type OAuthPayload = z.infer<typeof payloadSchema>;
