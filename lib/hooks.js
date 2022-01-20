import useSWR from "swr";

export function useSignedInUser() {
  const { data, error } = useSWR(`/api/user`, {
    refreshInterval: 0,
  });

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}
