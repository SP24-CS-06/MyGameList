"use server";

import envNode from "@/env-node";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { z } from "zod";
import { createToken } from "@/lib/auth-token";
import jwt from "jsonwebtoken";
import { createUser } from "@/lib/db";

export default async function callbackGoogle(params: string) {
  const urlParams = new URLSearchParams(params);
  const code = urlParams.get("code");
  if (!code) {
    console.error("error: no code in url params");
    return void redirect(envNode.NEXT_PUBLIC_SERVER_ORIGIN);
  }

  let data: Awaited<ReturnType<typeof exchangeGoogleCode>>;
  const tokenUrl = buildGoogleTokenUrl(code);
  try {
    data = await exchangeGoogleCode(tokenUrl);
  } catch (err) {
    console.log("not able to log in with google", "error:", err);
    return void redirect(envNode.NEXT_PUBLIC_SERVER_ORIGIN);
  }

  const token = createToken({
    name: data.name,
    sub: data.email,
    picture: data.picture,
  });

  try {
    await createUser({ email: data.email, username: data.name });
  } catch (error) {
    console.log("caught error while creating user:", error);
  }

  cookies().set("sid", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600 * 24 * 7, // 1 week in seconds
  });

  return void redirect(envNode.NEXT_PUBLIC_SERVER_ORIGIN);
}

const googleIdTokenSchema = z.object({
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

async function exchangeGoogleCode(tokenUrl: URL) {
  const res = await fetch(tokenUrl, { method: "POST" });
  const json = await res.json();
  const idToken = jwt.decode(json["id_token"]);
  return googleIdTokenSchema.parse(idToken);
}

function buildGoogleTokenUrl(code: string) {
  const tokenUrl = new URL("https://oauth2.googleapis.com/token");
  tokenUrl.searchParams.set("code", code);
  tokenUrl.searchParams.set("client_id", envNode.NEXT_PUBLIC_CLIENT_ID_GOOGLE);
  tokenUrl.searchParams.set("client_secret", envNode.CLIENT_SECRET_GOOGLE);
  tokenUrl.searchParams.set("grant_type", "authorization_code");
  tokenUrl.searchParams.set(
    "redirect_uri",
    `${envNode.NEXT_PUBLIC_SERVER_ORIGIN}/login/google`
  );
  return tokenUrl;
}
