import envBrowser from "@/env-browser";

export function generateUserProfileUrl(userId: string) {
  return envBrowser.NEXT_PUBLIC_SERVER_ORIGIN + `/user/${userId}`;
}

export function generateGameUrl(gameId: number) {
  return envBrowser.NEXT_PUBLIC_SERVER_ORIGIN + `/game/${gameId}`;
}
