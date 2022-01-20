import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { useSignedInUser } from "../lib/hooks";
import { dbToSlug } from "../lib/util";

// Components
import Price from "./Price";
import Rating from "./Rating";
import AddSnackButton from "./buttons/AddSnackButton";
import RemoveSnackButton from "./buttons/RemoveSnackButton";

const DEFAULT_RATING = {
  value: undefined,
  reviewCount: 0,
};

export default function Snack({ snack }) {
  const { user, isLoading, error } = useSignedInUser();
  const isUserSnack =
    user && user.snackIds && user.snackIds.includes(snack._id);
  const rating = snack.rating || DEFAULT_RATING;

  const scrubbedName = snack.name.replace(/[\s,\.]+$/, "");

  const SnackButton = isUserSnack ? (
    <RemoveSnackButton
      className={`${isLoading && "invisible"}`}
      user={user}
      snackId={snack._id}
    />
  ) : (
    <AddSnackButton className={`invisible`} user={user} snackId={snack._id} />
  );

  return (
    <div className="rounded-md bg-gray-100 mt-2 shadow-sm border">
      <li className="flex justify-between">
        <div className="flex">
          <div
            className={`mt-2.5 ml-1 mr-1.5 ${
              isLoading ? "invisible" : "animate-grow"
            }`}
          >
            {SnackButton}
          </div>
          <div>
            <h2 className="text-green-500 font-bold text-sm px-1 pt-1">
              {scrubbedName}
              {snack.limited && (
                <FaStar
                  title="Limited Time Available"
                  className="text-yellow-500 m-auto pl-1 pb-0.5 inline"
                />
              )}
            </h2>
            <p className="text-xs pl-1 italic">{snack.desc}</p>
            <div className="flex flex-wrap text-yellow-500 text-xs mt-2">
              <Link href={`/${dbToSlug(snack.park)}`}>
                <a className="text-tiny bg-yellow-500 text-white mb-1 mr-1 px-1 py-0.5 rounded-md hover:underline">
                  {snack.park}
                </a>
              </Link>
              {` `}
              <Link href={`/${dbToSlug(snack.park)}/${dbToSlug(snack.land)}`}>
                <a className="text-tiny bg-yellow-400 shadow-sm text-white px-1 mb-1 mr-1 py-0.5 rounded-md hover:underline">
                  {snack.land}
                </a>
              </Link>
              {` `}
              <Link
                href={`/${dbToSlug(snack.park)}/${dbToSlug(
                  snack.land
                )}/${dbToSlug(snack.vendor)}`}
              >
                <a className="text-tiny bg-yellow-500 text-white shadow-sm px-1 mb-1 mr-1 py-0.5 rounded-md hover:underline">
                  {snack.vendor}
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className="my-auto">
          <Price prices={snack.prices} />
          <Rating user={user} snackId={snack._id} rating={rating} />
        </div>
      </li>
    </div>
  );
}
