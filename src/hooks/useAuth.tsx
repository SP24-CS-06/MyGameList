"use client";

import { AuthContext } from "@/contexts/AuthProvider";
import { useContext } from "react";

export default function useAuth() {
  const userData = useContext(AuthContext);
  if (userData === null) {
    throw new Error(
      "Using the 'useAuth' component while AuthContext.Provider is not a parent component"
    );
  }
  return userData;
}
