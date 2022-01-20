import Link from "next/link";

export default function Home() {
  return (
    <div className="container min-h-screen mx-3 mt-10">
      <div className="bg-yellow-300 mt-5 mx-3 px-2 py-2 rounded-md">
        <p className="text-sm text-yellow-700">
          Browse snacks from Walt Disney World theme parks. Add them to your
          personal snack list and provide ratings.
        </p>
      </div>
      <h1 className="mt-5 mx-5 text-3xl text-green-700 font-bold">
        Disney World Parks
      </h1>
      <div className="flex flex-col mt-2 text-center">
        <Link href="/magic-kingdom">
          <a className="mx-5 my-3 border-2 text-white bg-yellow-600 border-yellow-500 shadow-md rounded-lg px-2 py-1 hover:underline">
            Magic Kingdom
          </a>
        </Link>
        <Link href="/epcot">
          <a className="mx-5 my-3 border-2 text-white bg-yellow-600 border-yellow-500 shadow-md rounded-lg px-2 py-1 hover:underline">
            Epcot
          </a>
        </Link>
        <Link href="/animal-kingdom">
          <a className="mx-5 my-3 border-2 text-white bg-yellow-600 border-yellow-500 shadow-md rounded-lg px-2 py-1 hover:underline">
            Animal Kingdom
          </a>
        </Link>
        <Link href="/hollywood-studios">
          <a className="mx-5 my-3 border-2 text-white bg-yellow-600 border-yellow-500 shadow-md rounded-lg px-2 py-1 hover:underline">
            Hollywood Studios
          </a>
        </Link>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  return {
    props: {},
  };
}
