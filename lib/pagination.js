import clientPromise from "./mongodb";
import { setCache, getCache } from "./util";

const PAGINATION_CACHE_PATH = ".pagination";

async function _getNumPagesFromDB(query) {
  const client = await clientPromise;
  const db = client.db();
  const snackCount = await db.collection("items").find(query).count();
  return Math.ceil(snackCount / process.env.MAX_SNACKS_PER_PAGE);
}

export async function getNumPagesForSlugs(navData) {
  let cachedData;

  // Caching page data since it is used on all park pages
  try {
    cachedData = getCache(PAGINATION_CACHE_PATH);
  } catch (error) {
    console.log("Pagination cache not initialized");
  }

  if (!cachedData && navData) {
    let fetchedData = {};

    for (const park in navData) {
      const parkData = navData[park];
      const parkSlug = `/${parkData.slug}`;
      fetchedData[parkSlug] = await _getNumPagesFromDB({ park });

      for (const land in parkData.lands) {
        const landData = parkData.lands[land];
        const landSlug = `/${parkData.slug}/${landData.slug}`;
        fetchedData[landSlug] = await _getNumPagesFromDB({ park, land });

        for (const vendor in landData.vendors) {
          const vendorData = landData.vendors[vendor];
          const vendorSlug = `/${parkData.slug}/${landData.slug}/${vendorData.slug}`;
          fetchedData[vendorSlug] = await _getNumPagesFromDB({
            park,
            land,
            vendor,
          });
        }
      }
    }

    try {
      setCache(PAGINATION_CACHE_PATH, fetchedData);

      cachedData = fetchedData;
    } catch (error) {
      console.log("Error writing pagination data to cache");
      console.log(error);
    }
  }
  return cachedData;
}
