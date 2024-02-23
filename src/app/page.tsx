import Review from "@/components/Review/Review";
import ReviewInput from "@/components/Review/ReviewInput";
import React from "react";

const Home = () => {
  // TODO: remove this once we integrate the backend
  const dummyReview: Review = {
    gameCover:
      "https://upload.wikimedia.org/wikipedia/en/thumb/2/25/Half-Life_2_cover.jpg/220px-Half-Life_2_cover.jpg",
    gameId: "123456",
    gameName: "Half-Life 2",
    userImg:
      "https://i.pinimg.com/236x/25/ef/a7/25efa79cb9e70f6af08cb47f851b8ebf.jpg",
    username: "enzo",
    userId: "123456",
    content:
      "I wanted to make this review short and sweet, but it's hard to stop writing, even when excluding facts that could potentially contaminate an exceptionally well thought-out gaming experience. There's just so much to say. Half-Life 2 is, simply put, the best single-player shooter ever released for the PC. It does so many things right in so many ways that it might be possible to write a thesis on the topic of Half-Life 2 compared to other",
    rating: 5,
  };

  return (
    <div className="w-full max-w-[var(--max-w-home)] m-auto mt-8">
      <div className="w-full">
        <ReviewInput />
      </div>
      <div className="mt-8">
        <Review review={dummyReview} />
      </div>
    </div>
  );
};

export default Home;
