"use server";

import type { ClientUser, Game } from "@/db/db-schema";
import { reviewInsert } from "@/db/reviews";

export default async function reviewSubmit(
  game: Game,
  description: string,
  rating: number,
  user: ClientUser
) {
  await reviewInsert(user.username, game.appid, description, rating);
  console.log(game, description, rating, user);
}
