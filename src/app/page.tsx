import Review from "@/components/Review/Review";
import ReviewInput from "@/components/Review/ReviewInput";
import { reviewsAll } from "@/db/reviews";
import { getUserFromToken } from "@/lib/auth";
import React from "react";

const Home = async () => {
  const reviews = await reviewsAll();
  console.log(reviews);
  const userData = getUserFromToken();
  return (
    <div className="w-full max-w-[var(--max-w-home)] m-auto mt-8">
      <div className="w-full">{userData && <ReviewInput />}</div>
      <div className="mt-8">
        {(reviews || []).map(r => (
          <Review
            review={r}
            user={{ picture: r.picture, username: r.username }}
            key={r.username + r.created_at + r.appid}
          />
        ))}
        <p>reviews here</p>
      </div>
    </div>
  );
};

export default Home;
