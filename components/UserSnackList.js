import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";

export default function UserSnackList() {
  const { id } = useUser();

  return (
    <div className="mx-4 mt-2 p-0.5">
      <div className="ml-4">
        <UserButton />
      </div>
      <Link href={`/user/${id}`}>
        <a className="text-white text-xs bg-yellow-600 rounded-md p-0.5 shadow-sm border-2 border-green-900 hover:bg-white hover:text-yellow-600">
          Snack List
        </a>
      </Link>
    </div>
  );
}
