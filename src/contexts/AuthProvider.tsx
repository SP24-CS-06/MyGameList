"use client";

import { createContext } from "react";

type AuthContextData = {
  username: string;
  profilePic: string;
} | null;

export const AuthContext = createContext<AuthContextData | null>(null);

type Props = {
  children: React.ReactNode;
  userData: AuthContextData;
};

export default function AuthProvider({ children, userData }: Props) {
  return (
    <AuthContext.Provider value={userData}>{children}</AuthContext.Provider>
  );
}
