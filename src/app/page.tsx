import Review from "@/components/Review/Review";
import ReviewInput from "@/components/Review/ReviewInput";
import { reviewsAll } from "@/db/reviews";
import React from "react";

const Home = async () => {
  const reviews = await reviewsAll();
  return (
    <div className="w-full max-w-[var(--max-w-home)] m-auto mt-8">
      <div className="w-full">
        <ReviewInput />
      </div>
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
