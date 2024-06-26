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
export async function reviewsByUsername(
  username: string
): Promise<Review[] | null> {
  const res = await db.raw(
    "SELECT r.appid, r.rating, r.created_at, r.content, apps.image_url, apps.title, users.username, users.picture FROM reviews r \
      LEFT JOIN users ON r.reviewer_id = users.id \
      LEFT JOIN apps ON r.appid = apps.appid \
      WHERE users.username = ?",
    [username]
  );
  if (!Object.hasOwn(res, "rows")) return null;

  const parsedReviews = reviewArraySchema.safeParse(res.rows);

  return parsedReviews.success ? parsedReviews.data : null;
}

/**
 * @example
  console.log(await reviewsAll());
 */
export async function reviewsAll(): Promise<Review[] | null> {
  const res = await db.raw(
    "SELECT r.appid, r.rating, r.created_at, r.content, apps.image_url, apps.title, users.username, users.picture FROM reviews r \
      LEFT JOIN users ON r.reviewer_id = users.id \
      LEFT JOIN apps ON r.appid = apps.appid \
      ORDER BY r.created_at DESC"
  );
  if (!Object.hasOwn(res, "rows")) return null;

  const parsedReviews = reviewArraySchema.safeParse(res.rows);

  return parsedReviews.success ? parsedReviews.data : null;
}

/**
 *
 * @example
 * console.log(await reviewByAppid(14532));
 */
export async function reviewByAppid(appid: number): Promise<Review[] | null> {
  const res = await db.raw(
    "SELECT apps.title, created_at, content, apps.image_url, reviews.appid, reviews.rating, users.username, users.picture FROM reviews \
      LEFT JOIN apps ON reviews.appid = apps.appid \
      LEFT JOIN users ON users.id = reviews.reviewer_id \
      WHERE reviews.appid = ? \
      ORDER BY reviews.created_at DESC",
    [appid]
  );
  if (!Object.hasOwn(res, "rows")) return null;

  const parsedReviews = reviewArraySchema.safeParse(res.rows);

  return parsedReviews.success ? parsedReviews.data : null;
}

export async function reviewInsert(
  username: string,
  appid: number,
  content: string,
  rating: number
): Promise<void> {
  await db.raw(
    "INSERT INTO reviews (reviewer_id, appid, content, rating) \
     SELECT id, ?, ?, ? FROM users WHERE users.username = ?",
    [appid, content, rating, username]
  );
}
