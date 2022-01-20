import { useState } from "react";
import { FaDrumstickBite } from "react-icons/fa";
import RatingModal from "./RatingModal";

export default function Rating({ user, snackId, rating }) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const isLoading = !user;

  let value = 0;
  const reviewCount = rating.reviewCount || 0;

  let drumStickColor;
  if (user && user.ratings && user.ratings.hasOwnProperty(snackId)) {
    value = user.ratings[snackId].value;
    drumStickColor = "text-green-300";
  } else if (rating) {
    value = rating.value ? Math.round(rating.value) : 0;
    drumStickColor = "text-yellow-500";
  }

  let reviewDrumSticks = [];
  for (let i = 0; i < value; i++) {
    reviewDrumSticks.push(
      <FaDrumstickBite key={i} className="text-xs animate-fade-in" />
    );
  }

  // Handle no reviews and replace with dashes
  let ratingTitle;
  if (reviewDrumSticks.length === 0) {
    reviewDrumSticks.push(
      <p key="blank" className="animate-fade-in">{`  ---  `}</p>
    );
    ratingTitle = "No reviews";
  } else {
    ratingTitle = `${value} out of 5 drumsticks`;
  }

  return (
    <>
      <div className="mt-1 ml-2">
        <button
          onClick={() => setIsOpen(true)}
          title={ratingTitle}
          className={`flex justify-center h-5 w-18 ${drumStickColor} bg-white border-2 items-center rounded-md p-1 mr-1 hover:bg-yellow-100`}
        >
          {!isLoading && reviewDrumSticks}
        </button>
        <p className="text-tiny text-center">{reviewCount} reviews</p>
      </div>
      <RatingModal
        user={user}
        snackId={snackId}
        isOpen={isOpen}
        handleClose={closeModal}
      />
    </>
  );
}
