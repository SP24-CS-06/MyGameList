"use server";

import type { ClientUser, Game } from "@/db/db-schema";

export default async function reviewSubmit(
  game: Game,
  description: string,
  rating: number,
  user: ClientUser
) {
  console.log(game, description, rating, user);
}
