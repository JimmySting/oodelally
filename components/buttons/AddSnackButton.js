import { FaPlusCircle } from "react-icons/fa";
import { useSWRConfig } from "swr";
import { requestAddSnack } from "../../lib/client";

export default function AddSnackButton({ user, snackId }) {
  const { mutate } = useSWRConfig();

  const addSnackForUser = async () => {
    // Update local user data immediately, but disable the revalidation
    user.snackIds.push(snackId);
    mutate("/api/user", user, false);

    // Send a request to the API to update the source
    await requestAddSnack(snackId);

    // Revalidate cache
    mutate("/api/user");
  };

  return (
    <FaPlusCircle
      title="Add to Snack List"
      className="text-green-700 cursor-pointer"
      onClick={addSnackForUser}
    />
  );
}
