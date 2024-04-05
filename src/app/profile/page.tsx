import React from "react";
import { getUserFromToken } from "@/lib/auth";
import { redirect } from "next/navigation";
import Profile from "@/components/Profile";

export default async function PersonalProfilePage() {
  const user = getUserFromToken();
  if (!user) redirect("/login");

  return <Profile user={user} />;
}
