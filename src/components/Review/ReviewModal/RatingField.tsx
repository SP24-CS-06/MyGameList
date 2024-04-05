import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Dispatch, useState } from "react";

type Props = {
  rating: number;
  setRating: Dispatch<number>;
};

const RatingField = ({ rating, setRating }: Props) => {
  const [hoverRating, setHoverRating] = useState(-1);

  return (
    <div className="mt-2">
      {Array.from({ length: 5 }, (_, i) => (
        <FontAwesomeIcon
          key={i}
          className={`${
            rating > i || hoverRating > i
              ? "text-yellow-200"
              : "text-[var(--icon)]"
          } ${i !== 0 ? "pl-2" : ""} w-8 h-full my-auto cursor-pointer`}
          icon={faStar}
          onMouseOver={() => setHoverRating(i + 1)}
          onMouseLeave={() => setHoverRating(-1)}
          onClick={() => setRating(i + 1)}
        />
      ))}
    </div>
  );
};

export default RatingField;
