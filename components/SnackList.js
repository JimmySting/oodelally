import { useState } from "react";

// Components
import NavChevron from "./buttons/NavChevron";
import NavMenu from "./NavMenu";
import Pagination from "./Pagination";
import Snack from "./Snack";

export default function SnackList({
  title,
  snacks,
  navData,
  slug,
  totalPages,
  currPage,
}) {
  const [prevSlug, setPrevSlug] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [menuEffect, setMenuEffect] = useState(false);

  if (!prevSlug) {
    setPrevSlug(slug);
  } else if (prevSlug !== slug) {
    setShowMenu(false);
    setPrevSlug(slug);
  }

  const handleClick = () => {
    // Used to only show effect after load
    if (!menuEffect) {
      setMenuEffect(true);
    }
    console.log(`CLICKED! -- showMenu: ${showMenu}`);
    setShowMenu(!showMenu);
  };

  const NavMenuBar = () => (
    <div className="z-30 w-full bg-green-700 h-10 shadow-sm">
      <button
        onClick={handleClick}
        className={`mx-3 pt-2.5 text-white cursor-pointer`}
      >
        <span className="text-sm">
          <NavChevron
            isOpen={showMenu}
            showEffect={menuEffect}
            styles="pb-0.5"
          />
        </span>{" "}
        Explore
      </button>
    </div>
  );

  return (
    <>
      <NavMenuBar />
      {showMenu ? (
        <div className="min-h-screen animate-fade-in">
          <NavMenu data={navData} />
        </div>
      ) : (
        <div className="relative flex flex-col content-center max-w-sm lg:max-w-2xl mx-auto">
          <div className="flex justify-between mt-5">
            <h1 className="text-green-700 text-sm font-bold">{title} Snacks</h1>
          </div>
          <ul className="flex-none">
            {snacks.map((snack) => (
              <Snack key={snack._id} snack={snack} />
            ))}
          </ul>
          <div className="flex justify-between mt-3">
            <div></div>
            <Pagination current={currPage} total={totalPages} slug={slug} />
          </div>
        </div>
      )}
    </>
  );
}
