"use client";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Dispatch, SetStateAction, useState } from "react";

type PropsModal = {
  game?: number; // TODO: change this to a Game type or TBD
  content?: string;
  rating?: number;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};

const ReviewInput = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
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

const ReviewModal = (props: PropsModal) => {
  return (
    <dialog
      className="border-[var(--border)] bg-[#ffffff] dark:bg-[#3b3b3b]"
      open
    >
      <button onClick={() => props.setModalOpen(false)}>BUTTON</button>
    </dialog>
  );
};

export default ReviewInput;
