import React from "react";
import Image from "next/image";
import { reviewsByUsername } from "@/db/reviews";
import Review from "@/components/Review/Review";
import { ClientUser } from "@/db/db-schema";

type Props = { user: ClientUser };

export default async function Profile({ user }: Props) {
  const reviews = await reviewsByUsername(user?.username);

  return (
    <div className="flex flex-row justify-between h-screen w-screen p-8">
      <div className="flex flex-col i my-3 w-1/4">
        <div className="flex justify-center">
          <Image
            src="/profile-pictures/defaultUser.jpg"
            className="rounded-full my-3 aligno-self-center"
            alt="Google"
            width={150}
            height={150}
          />
        </div>
        <h1 className="text-3xl font-bold">{user.username}</h1>
      </div>

      <div className="flex flex-col h-screen items-center w-8/12">
        <h1 className="text-2xl font-bold">Reviews:</h1>
        {(reviews || []).map(r => (
          <Review key={r.appid} review={r} user={user} />
        ))}
      </div>
    </div>
  );
}
