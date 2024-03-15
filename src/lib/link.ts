import envBrowser from "@/env-browser";

export function generateUserLink(userId: string) {
  return envBrowser.NEXT_PUBLIC_SERVER_ORIGIN + `/user/${userId}`;
}

export function generateGameLink(gameId: string) {
  return envBrowser.NEXT_PUBLIC_SERVER_ORIGIN + `/game/${gameId}`;
}