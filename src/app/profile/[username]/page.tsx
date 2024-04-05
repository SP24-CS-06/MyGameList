import React from "react";
import { redirect } from "next/navigation";
import Profile from "@/components/Profile";
import { userByUsername } from "@/db/user";

type Props = {
  params: { username: string };
};

export default async function PersonalProfilePage({ params }: Props) {
  const user = await userByUsername(params.username);
  if (!user) redirect("/login");

  return <Profile user={user} />;
}
