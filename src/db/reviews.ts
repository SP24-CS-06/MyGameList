import db from "@/lib/db";
import { reviewSchema, type Review } from "./db-schema";
import { z } from "zod";

const reviewArraySchema = z.array(reviewSchema);

/**
 * @param username 
 * @example
  const userData = getUserFromToken();
  if (userData) console.log(await reviewByUser(userData.username));
 */
export async function reviewByUsername(
  username: string
): Promise<Review[] | null> {
  const res = await db.raw(
    "SELECT title, created_at, content, a.image_url, r.appid, r.rating FROM reviews r \
      LEFT JOIN users ON reviews.reviewer_id = users.id \
      LEFT JOIN apps ON reviews.appid = apps.appid \
      WHERE users.username = ?",
    [username]
  );
  if (!Object.hasOwn(res, "rows")) return null;

  const parsedReviews = reviewArraySchema.safeParse(res.rows);

  return parsedReviews.success ? parsedReviews.data : null;
}
