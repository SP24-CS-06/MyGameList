import "server-only";
import { z } from "zod";

export const userSchema = z.object({
  id: z.number().or(z.string().transform(s => Number.parseInt(s))),
  email: z.string(),
  username: z.string(),
  picture: z.string(),
});

export type User = z.infer<typeof userSchema>;
export type ClientUser = Omit<User, "id">;

export const reviewSchema = z.object({
  appid: z.number().or(z.string().transform(s => Number.parseInt(s))),
  title: z.string(),
  rating: z.number().or(z.string().transform(s => Number.parseInt(s))),
  created_at: z.number(),
  content: z.string(),
  image_url: z.string(),
});

export type Review = z.infer<typeof reviewSchema>;

export const gameSchema = z.object({
  appid: z.number().or(z.string().transform(s => Number.parseInt(s))),
  title: z.string(),
  synopsis: z.string(),
  image_url: z.string(),
});

export type Game = z.infer<typeof gameSchema>;
