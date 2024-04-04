import "server-only";
import { z } from "zod";

export const userSchema = z.object({
  id: z.number().or(z.string().transform(s => Number.parseInt(s))),
  email: z.string(),
  username: z.string(),
  picture: z.string(),
});

export type User = z.infer<typeof userSchema>;

export const reviewSchema = z.object({
  id: z.number().or(z.string().transform(s => Number.parseInt(s))),
  created_at: z.number(),
  content: z.string(),
});

export type Review = z.infer<typeof reviewSchema>;
