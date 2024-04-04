import { z } from "zod";
import jwt from "jsonwebtoken";
import envNode from "@/env-node";
import { cookies } from "next/headers";
import { User } from "@/db/db-schema";

const tokenPayloadSchema = z.object({
  sub: z.string(),
  email: z.string(),
  picture: z.string(),
});

type AuthTokenPlayload = z.infer<typeof tokenPayloadSchema> & jwt.JwtPayload;

export function createToken(payload: AuthTokenPlayload) {
  const token = jwt.sign(payload, envNode.JWT_SECRET, {
    expiresIn: 60 * 60 * 2,
  });
  return token;
}

export function verifyToken(token: string): AuthTokenPlayload | null {
  const payload = jwt.verify(token, envNode.JWT_SECRET);
  const parsedToken = tokenPayloadSchema.safeParse(payload);
  if (!parsedToken.success) return null;
  return parsedToken.data;
}

export function getTokenPayload(): AuthTokenPlayload | null {
  const cookieStore = cookies();
  const sid = cookieStore.get("sid");
  if (!sid) return null;
  return verifyToken(sid.value);
}

export function getUserFromToken(): Omit<User, "id"> | null {
  const userData = getTokenPayload();
  return (
    userData && {
      email: userData.email,
      picture: userData.picture,
      username: userData.sub,
    }
  );
}
