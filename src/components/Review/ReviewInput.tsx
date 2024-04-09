"use client";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useReviewModal from "@/hooks/useReviewModal";
import ReviewModal from "./ReviewModal/ReviewModal";

const ReviewInput = () => {
  const { openModal, closeModal, isOpen } = useReviewModal();

  return (
    <>
      <ReviewModal isOpen={isOpen} closeModal={closeModal} />
      <div className="flex w-full border-[var(--border)] bg-[#ffffff] dark:bg-[#3b3b3b] rounded-[6px]">
        <FontAwesomeIcon
          className={"w-5 text-[var(--icon)] ml-3 h-full my-auto"}
          icon={faSearch}
        />
        <input
          className="w-full p-3 flex-grow rounded-[6px] outline-none"
          type="text"
          placeholder="Write a review..."
          onClick={openModal}
        />
      </div>
    </>
  );
};

export default ReviewInput;
