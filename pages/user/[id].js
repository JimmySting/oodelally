import { useUser } from "@clerk/nextjs";
import useSWR from "swr";
import Snack from "../../components/Snack";

function UserSnackList() {
  const { data, error } = useSWR("/api/user/snacks");
  const isLoading = !data && !error;

  let emptyList = false;
  if (data && data.length === 0) {
    emptyList = true;
  }

  const emptyListText = (
    <h3 className="rounded-lg p-3 my-3 bg-yellow-300 text-yellow-700">
      No snacks here yet!
    </h3>
  );

  return (
    <div className="min-h-screen">
      {isLoading ? (
        <div className="invisible"></div>
      ) : emptyList ? (
        emptyListText
      ) : (
        <div className="flex flex-col content-center animate-fade-in">
          <ul className="flex-none">
            {data.map((snack) => (
              <Snack key={snack._id} snack={snack} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function User() {
  const { firstName } = useUser();
  const makePossessive = (name) => {
    return name.endsWith("s") ? `${name}'` : `${name}'s`;
  };

  return (
    <div className="max-w-sm lg:max-w-2xl mx-auto mt-5">
      <div className="text-green-700 font-bold">
        {makePossessive(firstName)} Snack List
      </div>
      <UserSnackList></UserSnackList>
    </div>
  );
}
