import React from "react";
import UserIcon from "./UserIcon";
import { generateGameLink, generateUserLink } from "@/lib/link";
import Image from "next/image";

// TODO: change this
type Review = {
  gameName: string;
  gameCover: string;
  gameId: string;
  userId: string;
  username: string;
  userImg: string;
  rating: number;
  content: string;
};

type Props = {
  review: Review;
};

const Review = (props: Props) => {
  const { review } = props;

  const userLink = generateUserLink(review.username);
  const gameLink = generateGameLink(review.gameId);

  return (
    <div className="w-full bg-[#ffffff] dark:bg-[#3b3b3b] rounded-[6px] p-4 flex flex-row shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] my-4">
      <div className="pr-3">
        <UserIcon userLink={userLink} userImg={review.userImg} />
      </div>
      <div className="flex flex-col">
        <div className="pb-5">
          <a href={userLink}>
            <span className="font-bold text-[1rem] hover:underline cursor-pointer pb-2">{`@${review.username}`}</span>
          </a>
          <p>
            Left a review about{" "}
            <a className="underline" href={gameLink}>
              {review.gameName}
            </a>
          </p>
        </div>
        <div className="flex flex-row">
          <a href={gameLink}>
            <Image
              className="object-cover min-w-[200px]"
              alt={`${review.gameName} Cover Art`}
              width={200}
              height={200}
              src={review.gameCover}
            />
          </a>
          <div className="flex flex-col px-5">
            <p className="text-ellipsis">{review.content}</p>
            <a href="google.com" className="mx-auto mt-auto mb-4 underline">
              <span>See more</span>
            </a>
          </div>
        </div>
        <div className="pt-4">
          <span>45 minutes ago</span>
        </div>
      </div>
    </div>
  );
};

export default Review;
