import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="flex flex-col justify-between w-full h-24 px-3 pt-1 mt-10 z-50 bg-green-800 shadow-sm">
        <div>
          <Link href="/about">
            <a className="text-yellow-600 text-sm hover:underline">About</a>
          </Link>
        </div>
        <div className="text-white text-xs pb-2">
          © {new Date().getFullYear()}, Built with
          {` `}
          <a
            className="text-gray-300 hover:underline"
            href="https://www.nextjs.org"
          >
            NextJS
          </a>
        </div>
      </div>
    </footer>
  );
}
