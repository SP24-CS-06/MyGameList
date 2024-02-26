import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faSteam } from "@fortawesome/free-brands-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Review from "@/components/Review/Review";

export default function Profile() {
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
        <h1 className="text-3xl font-bold">Doug Dimmadome</h1>
        <p className="text-md">
          <span className="text-gray-500">@</span>dDimmagit
        </p>
        <p className="text-md my-3">
          Hey! My name is Doug Dimmadome and I like videogames!
        </p>
        <button className=" my-3 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-4 rounded-lg bg-black text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full">
          Edit:
        </button>
        <a
          target="_blank"
          href="https://maps.app.goo.gl/RnFzUr1gvnPL7CnYA"
          className="flex flex-row items-center my-4"
        >
          <FontAwesomeIcon
            icon={faLocationDot}
            style={{ color: "#606060" }}
            className="w-6"
          />
          <div className="mx-3">Miami</div>
        </a>
        <a
          target="_blank"
          href="https://www.instagram.com/whyiamthere/"
          className="flex flex-row items-center my-4"
        >
          <FontAwesomeIcon
            icon={faInstagram}
            style={{ color: "#606060" }}
            className="w-6"
          />
          <div className="mx-3">@dDimma</div>
        </a>
        <a
          target="_blank"
          href="https://steamcommunity.com/id/whyiamthere"
          className="flex flex-row items-center my-4"
        >
          <FontAwesomeIcon
            icon={faSteam}
            style={{ color: "#606060" }}
            className="w-6"
          />
          <div className="mx-3">dDimma</div>
        </a>
      </div>

      <div className="flex flex-col h-screen items-center w-8/12">
        <h1 className="text-2xl font-bold">Reviews:</h1>
        <Review review={dummyReview} />
        <Review review={dummyReview} />
        <Review review={dummyReview} />
      </div>
    </div>
  );
}
