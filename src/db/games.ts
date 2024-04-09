import db from "@/lib/db";
import { Game, gameSchema } from "./db-schema";
import { z } from "zod";

const gameArraySchema = z.array(gameSchema);

/**
 * @param query 
 * @example
  const query = "counter-strike";
  if (query.length) console.log(await getGameSuggestions(query));
 */
export async function getGameByTitle(query: string): Promise<Game[] | null> {
  const res = await db.raw(
    "SELECT appid, title, synopsis, image_url\
      FROM apps\
      WHERE title ILIKE ? \
      LIMIT 20",
    [`${query}%`]
  );
  if (!Object.hasOwn(res, "rows")) return null;

  const parsedGames = gameArraySchema.safeParse(res.rows);
  return parsedGames.success ? parsedGames.data : null;
}
