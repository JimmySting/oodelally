import { FaChevronRight } from "react-icons/fa";

export default function NavChevron({ showEffect, isOpen, styles }) {
  const rotateClass = isOpen
    ? "animate-rotate-forward"
    : "animate-rotate-reverse";

  return (
    <FaChevronRight
      className={`${showEffect ? rotateClass : ""} inline ${styles}`}
    />
  );
}
