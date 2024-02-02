import envNode from "@/env-node";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const code = searchParams.get("code");
  if (!code) {
    console.error("error: no code in url params");
    return void redirect(envNode.NEXT_PUBLIC_SERVER_ORIGIN);
  }

  console.log(code);

  return void redirect(envNode.NEXT_PUBLIC_SERVER_ORIGIN);
}
