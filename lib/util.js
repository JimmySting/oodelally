import fs from "fs";
import path from "path";
import { startCase, capitalize } from "lodash";
// import { decode } from "punycode";

// Ex: Magic Kingdom >> magic-kingdom
// Ex: Maurice's Tavern >> maurice's-tavern
export function dbToSlug(dbName) {
  return encodeURIComponent(dbName.trim().replace(/ /g, "-")).toLowerCase();
}

// Ex: magic-kingdom >> Magic Kingdom
export function slugToDb(slugName) {
  return decodeURIComponent(slugName)
    .replace(/-/g, " ")
    .replace(/\w+/g, capitalize)
    .replace(/'S/g, "'s");
}

export function getCache(key) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, key), "utf-8"));
}

export function setCache(key, data) {
  fs.writeFileSync(path.join(__dirname, key), JSON.stringify(data), "utf-8");
}

export function getPartsFromSlug(slug, hasPagePart) {
  const startIndex = hasPagePart ? 2 : 1;
  let park, land, vendor;
  switch (slug.length) {
    case startIndex:
      // Park only
      [park] = slug;
      break;
    case startIndex + 1:
      // Park + Land
      [park, land] = slug;
      break;
    case startIndex + 2:
      // Park, Land, and Vendor
      [park, land, vendor] = slug;
      break;
    default:
      [park] = slug;
      console.log("Shouldn't get here!");
  }
  return [park, land, vendor];
}
