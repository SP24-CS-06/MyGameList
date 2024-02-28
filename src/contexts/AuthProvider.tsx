"use client";

import { createContext } from "react";

type AuthContextData = {
  username: string;
  picture: string;
} | null;

export const AuthContext = createContext<AuthContextData | null>(null);

type Props = {
  children: React.ReactNode;
  userData: AuthContextData;
};

export default function AuthProvider({ children, userData }: Props) {
  console.log("populated AuthProvider with:", userData);
  return (
    <AuthContext.Provider value={userData}>{children}</AuthContext.Provider>
  );
}
