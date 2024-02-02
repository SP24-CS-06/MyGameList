"use server";

import envNode from "@/env-node";
import { redirect } from "next/navigation";
import { z } from "zod";

const responseSchema = z.object({
  name: z.string(),
  email: z.string(),
  picture: z.string(),
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

  let data: z.infer<typeof responseSchema> & {
    [field: string]: string | undefined;
  };
  try {
    const res = await fetch(tokenUrl, { method: "POST" });
    console.log(res.status);
    data = await res.json();
    data = responseSchema.parse(data);
  } catch (err) {
    console.log("not able to log in with google", "error:", err);
    return void redirect(envNode.NEXT_PUBLIC_SERVER_ORIGIN);
  }

  console.log(data);

  return void redirect(envNode.NEXT_PUBLIC_SERVER_ORIGIN);
}
