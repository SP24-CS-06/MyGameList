"use client";

import { AuthContext } from "@/contexts/AuthProvider";
import { useContext } from "react";

/** @returns AuthContextData or null if the user is not logged in */
export default function useAuth() {
  const userData = useContext(AuthContext);
  if (userData === undefined) {
    throw new Error(
      "Using the 'useAuth' component while AuthContext.Provider is not a parent component"
    );
  }
  return userData;
}
