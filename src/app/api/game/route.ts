import { getGameByTitle } from "@/db/games";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({
      apps: [],
      error: "Missing query parameter",
    });
  }

  const games = await getGameByTitle(query);

  return NextResponse.json({
    apps: games,
    error: null,
  });
}
