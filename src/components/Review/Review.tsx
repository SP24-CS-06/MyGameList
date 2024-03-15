import React from "react";
import UserIcon from "./UserIcon";
import { generateGameLink, generateUserLink } from "@/lib/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

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
    <div className="w-full dark:bg-card rounded-md p-4 flex flex-row my-4 border dark:border-none">
      <div className="pr-3">
        <UserIcon userLink={userLink} userImg={review.userImg} />
      </div>
      <div className="flex flex-col">
        <div className="pb-5">
          <a href={userLink}>
            <span className="font-bold text-lg hover:underline cursor-pointer pb-2">{`@${review.username}`}</span>
          </a>
          <p>
            Left a review about{" "}
            <a className="underline" href={gameLink}>
              {review.gameName}
            </a>
          </p>
        </div>
        <div className="flex">
          <a href={gameLink}>
            <Image
              className="object-cover min-w-[200px] rounded-sm"
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
        <div className="pt-4 flex align-baseline">
          <FontAwesomeIcon className={"h-6 my-auto"} icon={faCalendar} />
          <span className="my-auto ml-2">45 minutes ago</span>
        </div>
      </div>
    </div>
  );
};

export default Review;
