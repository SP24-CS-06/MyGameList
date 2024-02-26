import "server-only";
import knex from "knex";
import envNode from "@/env-node";

export default knex({
  client: "pg",
  pool: { min: 0, max: 10 },
  connection: envNode.DB_URL,
  debug: true,
});
