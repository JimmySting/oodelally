import { FaCheckCircle } from "react-icons/fa";
import { useSWRConfig } from "swr";
import { requestRemoveSnack } from "../../lib/client";

export default function RemoveSnackButton({ user, snackId }) {
  const { mutate } = useSWRConfig();

  const removeSnackForUser = async () => {
    // Update local user data immediately, but disable the revalidation
    const snackIndex = user.snackIds.indexOf(snackId);
    user.snackIds.splice(snackIndex, 1);
    mutate("/api/user", user, false);

    // Send a request to the API to update the source
    await requestRemoveSnack(snackId);

    // Revalidate cache
    mutate("/api/user");
  };

  return (
    <FaCheckCircle
      title="Remove from Snack List"
      className="text-green-300 cursor-pointer"
      onClick={removeSnackForUser}
    />
  );
}
