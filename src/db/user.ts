import db from "@/lib/db";
import { User, userSchema } from "./db-schema";
import { PartialBy } from "@/lib/types";

/** creates a new user if it doesn't exist */
export async function createUser(user: Omit<User, "id">) {
  console.log("--- CREATE USER ---");

  const existingUser = await userByEmail(user.email);
  if (existingUser) {
    const u: PartialBy<User, "id"> = { ...existingUser }; // remove id from user object before returning it
    delete u.id;
    return u;
  }

  const newUser = { ...user };

  const count = await countUsernamePrefix(newUser.username);
  if (count > 0) {
    newUser.username += `#${count + 1}`;
  }

  console.log("inserting new user", JSON.stringify(newUser, null, 2));
  const insertedUser = await db
    .table<User>("users")
    .insert(newUser)
    .returning("*")
    .onConflict()
    .ignore();
  console.log(insertedUser);

  console.log("-------------------");

  return newUser;
}

async function countUsernamePrefix(username: string) {
  console.log("counting users with username starting with", username);

  const res = await db("users")
    .select()
    .count("*")
    .from("users")
    .whereRaw("username LIKE ?", [`${username}%`]);

  const count = Number.parseInt(res[0]?.count?.toString() ?? "0");
  console.log(res, count);

  return count;
}

export async function userByEmail(email: string): Promise<User | null> {
  const res = await db.raw("SELECT * FROM users WHERE email = ?", email);
  if (!Object.hasOwn(res, "rows")) return null;

  const parsedUser = userSchema.safeParse(res.rows[0]);

  return parsedUser.success ? parsedUser.data : null;
}

export async function userByUsername(username: string): Promise<User | null> {
  const res = await db.raw("SELECT * FROM users WHERE username = ?", username);
  if (!Object.hasOwn(res, "rows")) return null;

  const parsedUser = userSchema.safeParse(res.rows[0]);

  return parsedUser.success ? parsedUser.data : null;
}
