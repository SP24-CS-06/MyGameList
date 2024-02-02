import { z } from "zod";
import jwt from "jsonwebtoken";
import envNode from "@/env-node";

const tokenPayloadSchema = z.object({
  sub: z.string(),
  name: z.string(),
  picture: z.string(),
});

type AuthTokenPlayload = z.infer<typeof tokenPayloadSchema> & jwt.JwtPayload;

export function createToken(payload: AuthTokenPlayload) {
  const token = jwt.sign(payload, envNode.JWT_SECRET, {
    expiresIn: 60 * 60 * 2,
  });
  return token;
}

export function verifyToken(token: string) {
  const payload = jwt.verify(token, envNode.JWT_SECRET);
  tokenPayloadSchema.parse(payload);
  return payload as AuthTokenPlayload;
}
