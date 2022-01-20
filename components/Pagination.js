import React from "react";
import Link from "next/link";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";

export default function Pagination({ current, total, slug }) {
  const NumberBox = ({ children }) => (
    <div className="mx-0.5 px-1 pt-1 shadow-sm text-center h-5 text-tiny rounded-sm bg-green-300">
      {children}
    </div>
  );

  const ArrowBox = React.forwardRef(({ children, disabled, href }, ref) => {
    return (
      <div
        className={`mx-1 border-2 m-auto w-7 h-5 text-sm rounded-sm cursor-pointer ${
          disabled
            ? "border-green-100 cursor-text text-gray-200 pointer-events-none"
            : "border-green-400 cursor-pointer"
        }`}
      >
        <a href={href} ref={ref}>
          {children}
        </a>
      </div>
    );
  });

  let pageBoxes = [];
  const prevDisabled = current == 1;
  const nextDisabled = current == total;
  const firstPage = slug;
  const prevPage =
    current == 2 ? firstPage : `${slug}/pg-${parseInt(current) - 1}`;
  const nextPage = `${slug}/pg-${parseInt(current) + 1}`;
  const lastPage = `${slug}/pg-${total}`;

  // Previous page arrows
  let firstPageComponent, prevPageComponent;
  if (prevDisabled) {
    firstPageComponent = (
      <ArrowBox key="first" disabled={prevDisabled}>
        <FaAngleDoubleLeft className="pt-0.5 pl-1 ml-0.5" />
      </ArrowBox>
    );
    prevPageComponent = (
      <ArrowBox key="prev" disabled={prevDisabled}>
        <FaAngleLeft className="pt-0.5 pl-2" />
      </ArrowBox>
    );
  } else {
    firstPageComponent = (
      <Link key="first" href={firstPage} passHref>
        <ArrowBox disabled={prevDisabled}>
          <FaAngleDoubleLeft className="pt-0.5 pl-1 ml-0.5" />
        </ArrowBox>
      </Link>
    );
    prevPageComponent = (
      <Link key="prev" href={prevPage} passHref>
        <ArrowBox disabled={prevDisabled}>
          <FaAngleLeft className="pt-0.5 pl-2" />
        </ArrowBox>
      </Link>
    );
  }

  pageBoxes.push(firstPageComponent);
  pageBoxes.push(prevPageComponent);

  // Current page and range
  pageBoxes.push(
    <NumberBox key="page">{`Page ${current} of ${total}`}</NumberBox>
  );

  // Next page arrows
  let lastPageComponent, nextPageComponent;
  if (nextDisabled) {
    nextPageComponent = (
      <ArrowBox key="next" disabled={nextDisabled}>
        <FaAngleRight className="pt-0.5 pl-2" />
      </ArrowBox>
    );
    lastPageComponent = (
      <ArrowBox key="last" disabled={nextDisabled}>
        <FaAngleDoubleRight className="pt-0.5 pl-1 ml-0.5" />
      </ArrowBox>
    );
  } else {
    nextPageComponent = (
      <Link key="next" href={nextPage} passHref>
        <ArrowBox disabled={nextDisabled}>
          <FaAngleRight className="pt-0.5 pl-2" />
        </ArrowBox>
      </Link>
    );
    lastPageComponent = (
      <Link key="last" href={lastPage} passHref>
        <ArrowBox disabled={nextDisabled}>
          <FaAngleDoubleRight className="pt-0.5 pl-1 ml-0.5" />
        </ArrowBox>
      </Link>
    );
  }
  pageBoxes.push(nextPageComponent);
  pageBoxes.push(lastPageComponent);
  return <div className="flex">{pageBoxes}</div>;
}
