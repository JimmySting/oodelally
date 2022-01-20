import { SignedIn, SignedOut } from "@clerk/nextjs";
import Head from "next/head";
import Link from "next/link";
import { SignInButton } from "@clerk/nextjs";
import UserSnackList from "./UserSnackList";

export default function Header({ title }) {
  const titleText = title || "oodellally";

  return (
    <>
      <Head>
        <title>{titleText}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="sticky top-0 z-50">
        <div className="flex justify-between w-full h-16 bg-green-800">
          <div>
            <Link href="/">
              <a className="text-white text-3xl mx-2 mt-2 p-0.5">oodelally</a>
            </Link>
            <div className="text-yellow-600 text-sm mx-3 fo">
              Disney Snack Reviews
            </div>
          </div>
          <SignedIn>
            <UserSnackList />
          </SignedIn>
          <SignedOut>
            <SignInButton modal>
              <button className="text-white text-xs h-8 w-16 bg-yellow-600 rounded-md p-0.5 mx-3 my-3 shadow-sm border-2 border-green-900 hover:underline">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </>
  );
}
