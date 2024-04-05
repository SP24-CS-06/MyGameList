import ReviewInput from "@/components/Review/ReviewInput";
import React from "react";

const Home = async () => {
  return (
    <div className="w-full max-w-[var(--max-w-home)] m-auto mt-8">
      <div className="w-full">
        <ReviewInput />
      </div>
      <div className="mt-8">
        <p>reviews here</p>
      </div>
    </div>
  );
};

export default Home;
