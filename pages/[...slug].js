import {
  getAllParkPaths,
  getSnacks,
  getLimitOffsetForPage,
  getSnackNavData,
} from "../lib/snacks";
import { getNumPagesForSlugs } from "../lib/pagination";
import { slugToDb, getPartsFromSlug } from "../lib/util";

// Components
import SnackList from "../components/SnackList";

export default function Park({
  title,
  snacks,
  navData,
  slug,
  totalPages,
  currPage,
}) {
  return (
    <SnackList
      title={title}
      snacks={snacks}
      navData={navData}
      slug={slug}
      totalPages={totalPages}
      currPage={currPage}
    />
  );
}

export async function getStaticPaths() {
  const paths = await getAllParkPaths();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const lastPathPart = params.slug[params.slug.length - 1];
  const pageNumMatch = lastPathPart.match(/pg-([\d]+)/);

  let fullSlug, pageNum;
  if (pageNumMatch) {
    // Form slug without the "pg-n" portion to look up total pages from cache
    fullSlug = `/${params.slug.slice(0, params.slug.length - 1).join("/")}`;
    pageNum = parseInt(pageNumMatch[1]);
  } else {
    fullSlug = `/${params.slug.join("/")}`;
    pageNum = 1;
  }

  const { limit, offset } = getLimitOffsetForPage(pageNum);
  const [park, land, vendor] = getPartsFromSlug(params.slug, pageNumMatch);
  const title = slugToDb(vendor || land || park);
  const snacks = await getSnacks(park, land, vendor, offset, limit);
  const navData = await getSnackNavData();
  const pageInfo = await getNumPagesForSlugs(navData);
  const totalPages = pageInfo[fullSlug];

  return {
    props: {
      title,
      snacks: JSON.parse(JSON.stringify(snacks)),
      navData: JSON.parse(JSON.stringify(navData)),
      slug: fullSlug,
      totalPages,
      currPage: pageNum,
    },
    revalidate: 60,
  };
}
