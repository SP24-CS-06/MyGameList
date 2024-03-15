"use client";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  useState,
} from "react";
import ReviewModal from "./ReviewModal";

const ReviewInput = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      {isModalOpen ? (
        <div
          className="w-screen h-screen absolute top-0 left-0 bg-black bg-opacity-35 transition-all"
          onClick={() => setModalOpen(false)}
        ></div>
      ) : (
        <></>
      )}
      <div className="flex w-full border-[var(--border)] bg-[#ffffff] dark:bg-[#3b3b3b] rounded-[6px]">
        <FontAwesomeIcon
          className={"w-5 text-[var(--icon)] ml-3 h-full my-auto"}
          icon={faSearch}
        />
        <input
          className="w-full p-3 flex-grow rounded-[6px] outline-none"
          type="text"
          placeholder="Write a review..."
          onClick={() => setModalOpen(true)}
        />
      </div>
      {isModalOpen && <ReviewModal setModalOpen={setModalOpen} />}
    </>
  );
};



export default ReviewInput;
