import clientPromise from "./mongodb";
import { getNumPagesForSlugs } from "./pagination";
import { dbToSlug, slugToDb, setCache, getCache } from "./util";

const NAV_DATA_CACHE_PATH = ".nav-data";

function _createPaths(numParkPages) {
  let paths = [];
  for (let park in numParkPages) {
    const parkName = dbToSlug(park);
    for (let pageCount = 1; pageCount <= numParkPages[park]; pageCount++) {
      const pathParts =
        pageCount === 1 ? [parkName] : [parkName, `pg-${pageCount}`];
      paths.push({
        params: {
          slug: pathParts,
        },
      });
    }
  }

  return paths;
}

function _createPathsForSlugs(totalPageData) {
  let paths = [];
  for (let slug in totalPageData) {
    if (totalPageData[slug] > 0) {
      const slugParts = slug.split("/").slice(1);
      for (let pageCount = 1; pageCount <= totalPageData[slug]; pageCount++) {
        const pathParts =
          pageCount === 1 ? [...slugParts] : [...slugParts, `pg-${pageCount}`];
        paths.push({
          params: {
            slug: pathParts,
          },
        });
      }
    }
  }

  return paths;
}

function _convertNavData(navDbData) {
  // Example DB data:
  // [
  //  {
  //    "_id": {
  //      "park": "Magic Kingdom",
  //      "land": "Fantasyland",
  //      "vendor": "Storybook Treats"
  //    }
  //  }
  // ]
  //
  // Example converted data:
  // {
  //    "Magic Kingdom": {
  //      "slug": "magic-kingdom",
  //      "lands": {
  //        "Fantasyland": {
  //          "slug": "fantasyland",
  //          "vendors": {
  //            "Storybook Treats": {
  //              "name": "Storybook Treats",
  //              "slug": "storybook-treats"
  //            },
  //          }
  //        }
  //      }
  //    }
  // }
  let parks = {};
  navDbData.forEach((entry) => {
    const data = entry._id;

    if (!data.park || !data.land) {
      return;
    }

    let park = parks[data.park] || {
      slug: dbToSlug(data.park),
      lands: {},
    };

    let land = park.lands[data.land] || {
      slug: dbToSlug(data.land),
      vendors: {},
    };

    const vendor = {
      name: data.vendor,
      slug: dbToSlug(data.vendor),
    };

    land.vendors[data.vendor] = vendor;
    park.lands[data.land] = land;
    parks[data.park] = park;
  });

  return parks;
}

export async function getSnackNavData() {
  const client = await clientPromise;
  const db = client.db();

  // Caching nav data so accessible to multiple pages
  let cachedData;
  try {
    cachedData = getCache(NAV_DATA_CACHE_PATH);
  } catch (error) {
    console.log("Nav data cache not initialized");
  }

  if (!cachedData) {
    const fetchedData = await db
      .collection("items")
      .aggregate([
        {
          $group: { _id: { park: "$park", land: "$land", vendor: "$vendor" } },
        },
      ])
      .toArray();
    const convertedData = _convertNavData(fetchedData);

    try {
      setCache(NAV_DATA_CACHE_PATH, convertedData);

      cachedData = convertedData;
    } catch (error) {
      console.log("Error writing nav data to cache");
      console.log(error);
    }
  }
  return cachedData;
}

export function getLimitOffsetForPage(pageNum) {
  const maxSnacks = parseInt(process.env.MAX_SNACKS_PER_PAGE);
  return {
    limit: maxSnacks,
    offset: pageNum === 1 ? 0 : maxSnacks * (pageNum - 1),
  };
}

export async function getSnacksForPark(park, skip = 0, limit = 25) {
  const client = await clientPromise;
  const db = client.db();

  return await db
    .collection("items")
    .find({ park: slugToDb(park) })
    .sort({ vendor: 1 })
    .limit(limit)
    .skip(skip)
    .toArray();
}

export async function getSnacks(park, land, vendor, skip = 0, limit = 20) {
  const client = await clientPromise;
  const db = client.db();

  const query = {};
  park && (query.park = slugToDb(park));
  land && (query.land = slugToDb(land));
  vendor && (query.vendor = slugToDb(vendor));

  return await db
    .collection("items")
    .find(query)
    .sort({ vendor: 1 })
    .limit(limit)
    .skip(skip)
    .toArray();
}

export async function getAllParkPaths() {
  const navData = await getSnackNavData();
  const totalPageData = await getNumPagesForSlugs(navData);

  return _createPathsForSlugs(totalPageData);
}
