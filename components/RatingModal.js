import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FaDrumstickBite } from "react-icons/fa";
import { useSWRConfig } from "swr";
import { requestAddRating } from "../lib/client";

export default function RatingModal({ user, snackId, isOpen, handleClose }) {
  const [ratingValue, setRatingValue] = useState(null);
  const { mutate } = useSWRConfig();

  const addRatingForUser = async (value) => {
    // Update local user data immediately, but disable the revalidation
    if (!user.ratings) {
      user.ratings = {};
    }

    const rating = {
      value,
      updated: Date.now(),
    };
    user.ratings[snackId] = rating;
    mutate("/api/user", user, false);

    // Send a request to the API to update the source
    await requestAddRating(snackId, rating);

    // Revalidate cache
    mutate("/api/user");
  };

  const handleSubmit = async () => {
    if (ratingValue) {
      await addRatingForUser(ratingValue);
    }

    handleClose();
  };

  const ratingDrumsicks = [];
  for (let i = 1; i <= 5; i++) {
    ratingDrumsicks.push(
      <button
        key={i}
        onClick={() => {
          setRatingValue(i);
        }}
        className={`${ratingValue >= i ? "text-green-300" : "text-gray-400"}`}
      >
        <FaDrumstickBite />
      </button>
    );
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={handleClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 opacity-30" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block text-center w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl border-2">
              <Dialog.Title
                as="h3"
                className="mx-auto text-lg font-medium leading-6 text-yellow-600"
              >
                Snack Rating
              </Dialog.Title>
              <div className="mt-2 text-4xl">{ratingDrumsicks}</div>

              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-yellow-500 border border-transparent rounded-md hover:bg-yellow-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
