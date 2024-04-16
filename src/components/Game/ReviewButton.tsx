"use client";
import { Game } from "@/db/db-schema";
import useReviewModal from "@/hooks/useReviewModal";
import React from "react";
import ReviewModal from "../Review/ReviewModal/ReviewModal";

type Props = {
  game: Game;
};

const ReviewButton = ({ game }: Props) => {
  const { isOpen, closeModal, openModal } = useReviewModal();

  return (
    <>
      <ReviewModal
        isOpen={isOpen}
        closeModal={closeModal}
        preSelectedGame={game}
      />
      <button
        onClick={openModal}
        className="p-3 mx-5 bg-[var(--button-background)] hover:bg-[var(--button-background-hover)]"
      >
        Leave a review
      </button>
    </>
  );
};

export default ReviewButton;
