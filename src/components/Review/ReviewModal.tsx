import {
  Dispatch,
  SetStateAction,
  useRef,
  useEffect,
  MutableRefObject,
} from "react";

type PropsModal = {
  game?: number; // TODO: change this to a Game type or TBD
  content?: string;
  rating?: number;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};

const ReviewModal = (props: PropsModal) => {
  const dialogRef = useRef<HTMLDialogElement>();

  useEffect(() => {
    if (dialogRef.current) dialogRef.current.focus();
  }, []);

  return (
    <dialog
      className="bg-[var(--card)] lg:min-w-[50vw] md:min-w-[80vw] sm:min-w-[90vw] min-h-[60vh] rounded-md flex items-stretch"
      ref={dialogRef as unknown as MutableRefObject<HTMLDialogElement>}
      open
    >
      <div className="p-5 flex flex-col w-full">
        {/* Title */}
        <h1 className="mx-auto text-[24px] font-bold">Write a new review</h1>
        {/* Body */}
        <div className="flex-grow h-full flex flex-col gap-5">
          <div>
            <label className="text-[18px]">Game</label>
            <input
              type="text"
              className="w-full mt-2 bg-[var(--input-background)] p-2 rounded-md"
            />
          </div>
          <div>
            <label className="text-[18px]">Rating</label>
            <input
              type="text"
              className="w-full mt-2 bg-[var(--input-background)] p-2 rounded-md"
              placeholder="Create a rating component"
            />
          </div>
          <div>
            <label className="text-[18px]">Description</label>
            <textarea className="w-full mt-2 h-full bg-[var(--input-background)] p-2 rounded-md" />
          </div>
        </div>
        {/* Footer */}
        <div className="mt-auto gap-2 flex ml-auto pt-2">
          <button
            className="bg-[var(--button-cancel-background)] p-2 hover:bg-[var(--button-cancel-background-hover)] rounded-md"
            onClick={() => props.setModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="bg-[var(--button-submit-background)] p-2 hover:bg-[var(--button-submit-background-hover)] rounded-md"
            onClick={() => props.setModalOpen(false)}
          >
            Submit
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ReviewModal;
