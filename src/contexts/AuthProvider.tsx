"use client";

import { createContext } from "react";

type AuthContextData = {
  username: string;
  picture: string;
};

export const AuthContext = createContext<AuthContextData | null | undefined>(
  undefined
);

type Props = {
  children: React.ReactNode;
  userData: AuthContextData | null;
};

export default function AuthProvider({ children, userData }: Props) {
  console.log("populated AuthProvider with:", userData);
  return (
    <AuthContext.Provider value={userData}>{children}</AuthContext.Provider>
  );
}
