"use server";

import envNode from "@/env-node";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { z } from "zod";
import { createToken } from "@/lib/auth-token";
import jwt from "jsonwebtoken";

const idTokenSchema = z.object({
  name: z.string(),
  email: z.string(),
  email_verified: z.boolean(),
  picture: z.string(),
  iat: z.number(),
  exp: z.number(),
  iss: z.string(),
  aud: z.string(),
  sub: z.string(),
});

export default async function callbackGoogle(params: string) {
  const urlParams = new URLSearchParams(params);
  const code = urlParams.get("code");
  if (!code) {
    console.error("error: no code in url params");
    return void redirect(envNode.NEXT_PUBLIC_SERVER_ORIGIN);
  }

  const tokenUrl = new URL("https://oauth2.googleapis.com/token");
  tokenUrl.searchParams.set("code", code);
  tokenUrl.searchParams.set("client_id", envNode.NEXT_PUBLIC_CLIENT_ID_GOOGLE);
  tokenUrl.searchParams.set("client_secret", envNode.CLIENT_SECRET_GOOGLE);
  tokenUrl.searchParams.set("grant_type", "authorization_code");
  tokenUrl.searchParams.set(
    "redirect_uri",
    `${envNode.NEXT_PUBLIC_SERVER_ORIGIN}/login/google`
  );

  let data: z.infer<typeof idTokenSchema>;
  try {
    const res = await fetch(tokenUrl, { method: "POST" });
    const json = await res.json();
    const idToken = jwt.decode(json["id_token"]);
    data = idTokenSchema.parse(idToken);
  } catch (err) {
    console.log("not able to log in with google", "error:", err);
    return void redirect(envNode.NEXT_PUBLIC_SERVER_ORIGIN);
  }

  const token = createToken({
    name: data.name,
    sub: data.email,
    picture: data.picture,
  });

  cookies().set("sid", token, {
    httpOnly: true,
  });

  return void redirect(envNode.NEXT_PUBLIC_SERVER_ORIGIN);
}
