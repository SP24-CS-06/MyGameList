import { useRef, useEffect, MutableRefObject, useState } from "react";
import RatingField from "./RatingField";
import GameField from "./GameField";
import type { Game } from "@/db/db-schema";
import Image from "next/image";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
};

const ReviewModal = ({ isOpen, closeModal }: Props) => {
  const [rating, setRating] = useState(-1);
  const [description, setDescription] = useState("");
  const [selectedGame, setSelectedGame] = useState<Game | null>();

  const dialogRef = useRef<HTMLDialogElement>();
  // unfocus any other component when modal appears
  useEffect(() => {
    if (dialogRef.current) dialogRef.current.focus();
  }, []);

  const handleSubmit = () => {
    console.log("TODO: handleSubmit. selectedGame: ", selectedGame);
    handleClose();
  };

  const handleClose = () => {
    console.log("TODO: reset all values when closing modal");
    closeModal();
  };

  if (!isOpen) return <></>;

  return (
    <>
      {/* Background */}
      <div
        className="w-screen h-screen absolute top-0 left-0 bg-black bg-opacity-35 transition-all"
        onClick={() => closeModal()}
      ></div>
      {/* Modal */}
      <dialog
        className="bg-[var(--card)] lg:min-w-[50vw] md:min-w-[80vw] sm:min-w-[90vw] min-h-[60vh] rounded-md flex items-stretch"
        ref={dialogRef as unknown as MutableRefObject<HTMLDialogElement>}
        open
      >
        <div className="p-5 flex flex-col w-full">
          {/* Title */}
          <h1 className="mx-auto text-[24px] font-bold">Write a new review</h1>
          {selectedGame && (
            <div className="m-auto pt-3">
              <Image
                width={100}
                height={100}
                src={selectedGame.image_url}
                alt={`Cover art for ${selectedGame.title}`}
              />
            </div>
          )}
          {/* Body */}
          <div className="flex-grow h-full flex flex-col gap-5">
            <div>
              <label className="text-[18px] mb-2">Game</label>
              <GameField callbackSelectedGame={setSelectedGame} />
            </div>
            <div>
              <label className="text-[18px]">Rating</label>
              <RatingField rating={rating} setRating={setRating} />
            </div>
            <div>
              <label className="text-[18px]">Description</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full mt-2 h-full bg-[var(--input-background)] p-2 rounded-md"
              />
            </div>
          </div>
          {/* Footer */}
          <div className="mt-auto gap-2 flex ml-auto pt-2">
            <button
              className="bg-[var(--button-cancel-background)] p-2 hover:bg-[var(--button-cancel-background-hover)] rounded-md"
              onClick={() => handleClose()}
            >
              Cancel
            </button>
            <button
              className="bg-[var(--button-submit-background)] p-2 hover:bg-[var(--button-submit-background-hover)] rounded-md"
              onClick={() => handleSubmit()}
            >
              Submit
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ReviewModal;
