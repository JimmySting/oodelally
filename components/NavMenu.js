import { useState } from "react";
import Link from "next/link";
import { FaArrowCircleRight } from "react-icons/fa";
import NavChevron from "./buttons/NavChevron";

export default function NavMenu({ data }) {
  const ListBulletParent = ({ name, href, children }) => {
    const [showChildMenu, setShowChildMenu] = useState(false);
    const [showEffect, setShowEffect] = useState(false);

    const handleClick = () => {
      setShowChildMenu(!showChildMenu);

      // Suppress effect on initial load
      if (!showEffect) {
        setShowEffect(true);
      }
    };

    return (
      <ul>
        <button onClick={handleClick} className="pt-2 cursor-pointer cl">
          <span>
            <NavChevron
              showEffect={showEffect}
              isOpen={showChildMenu}
              styles={"text-xs"}
            />
          </span>
          {` `}
          {name}
        </button>
        {href && (
          <Link href={href}>
            <a>
              <FaArrowCircleRight className="inline mx-1.5 text-yellow-600 text-sm hover:text-yellow-500" />
            </a>
          </Link>
        )}
        {showChildMenu && (
          <div className="text-gray-600 mx-3 my-1">{children}</div>
        )}
      </ul>
    );
  };

  const ListBullet = ({ name, href }) => {
    return (
      <li className="list-disc mx-3 my-1 marker:text-yellow-600">
        {href ? (
          <Link href={href}>
            <a className="hover:underline">{name}</a>
          </Link>
        ) : (
          <p title="No snacks available!">{name}</p>
        )}
      </li>
    );
  };

  const parkList = [];
  for (const park in data) {
    const parkData = data[park];

    const landList = [];
    for (const land in parkData.lands) {
      const landData = parkData.lands[land];
      const fullLandSlug = `${parkData.slug}/${landData.slug}`;

      const vendorList = [];
      for (const vendor in landData.vendors) {
        const vendorData = landData.vendors[vendor];
        const fullVendorSlug = `${fullLandSlug}/${vendorData.slug}`;
        vendorList.push(
          <ListBullet key={vendor} name={vendor} href={fullVendorSlug} />
        );
      }

      // Add vendors to land
      if (vendorList.length > 0) {
        landList.push(
          <ListBulletParent key={land} name={land} href={fullLandSlug}>
            {vendorList}
          </ListBulletParent>
        );
      } else {
        landList.push(
          <ListBullet key={land} name={land} href={fullLandSlug}></ListBullet>
        );
      }
    }

    // Add lands to parks
    if (landList.length > 0) {
      parkList.push(
        <ListBulletParent key={park} name={park} href={parkData.slug}>
          {landList}
        </ListBulletParent>
      );
    } else {
      parkList.push(
        <ListBullet key={park} name={park} href={parkData.slug}></ListBullet>
      );
    }
  }

  return <ul className="h-full mx-4 my-1 text-xl">{parkList}</ul>;
}
