import React from "react";
import UserIcon from "./UserIcon";
import { generateGameUrl, generateUserProfileUrl } from "@/lib/urls";
import Image from "next/image";
import type { ClientUser, Review } from "@/db/db-schema";

type Props = {
  review: Omit<Review, "picture" | "username">;
  user: ClientUser;
};

const Review = ({ review, user }: Props) => {
  const userUrl = generateUserProfileUrl(user.username);
  const gameUrl = generateGameUrl(review.appid);

  return (
    <div className="w-full dark:bg-card rounded-md p-4 flex flex-row my-4 border dark:border-none">
      <div className="pr-3">
        <UserIcon userLink={userUrl} userImg={user.picture} />
      </div>
      <div className="flex flex-col">
        <div className="pb-5">
          <a href={userUrl}>
            <span className="font-bold text-lg hover:underline cursor-pointer pb-2">{`@${user.username}`}</span>
          </a>
          <p>
            Left a review about{" "}
            <a className="underline" href={gameUrl}>
              {review.title}
            </a>
          </p>
        </div>
        <div className="flex flex-row">
          <a href={gameUrl}>
            <Image
              className="object-cover min-w-52"
              alt={`${review.title} Cover Art`}
              width={200}
              height={200}
              src={review.image_url}
            />
          </a>
          <div className="flex flex-col px-5">
            <p className="text-ellipsis">{review.content}</p>
            <a href="google.com" className="mx-auto mt-auto mb-4 underline">
              <span>See more</span>
            </a>
          </div>
        </div>
        {/* <div className="pt-4 flex align-baseline">
          <FontAwesomeIcon className={"h-6 my-auto"} icon={faCalendar} />
          <span className="my-auto ml-2">45 minutes ago</span>
        </div> */}
      </div>
    </div>
  );
};

export default Review;
