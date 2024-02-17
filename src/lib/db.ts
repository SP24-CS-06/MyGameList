import "server-only";
import knex from "knex";
import envNode from "@/env-node";
import { type User } from "./db-schema";

export const db = knex({
  client: "pg",
  pool: { min: 0, max: 10 },
  connection: envNode.DB_URL,
  debug: true,
});

export async function createUser(user: Omit<User, "id">) {
  console.log("--- CREATE USER ---");

  if (await userExistsWithEmail(user.email)) return;

  const newUser = { ...user };

  const count = await countUsernamePrefix(newUser.username);
  if (count > 0) {
    newUser.username += `#${count + 1}`;
  }

  console.log("inserting new user", JSON.stringify(newUser, null, 2));
  await db.insert(newUser).into("users").onConflict().ignore();

  console.log("-------------------");
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

export async function userExistsWithUsername(username: string) {
  console.log("checking if user exists with username", username);

  const res = await db.raw(
    "SELECT exists (SELECT 1 from users where username = ? LIMIT 1)",
    username
  );

  const exists = res.rows[0]?.exists;
  console.log(exists);

  return exists as boolean;
}

export async function userExistsWithEmail(email: string) {
  console.log("checking if user exists with email", email);

  const res = await db.raw(
    "SELECT exists (SELECT 1 from users where email = ? LIMIT 1)",
    email
  );

  const exists = res.rows[0]?.exists;
  console.log(exists);

  return exists as boolean;
}
