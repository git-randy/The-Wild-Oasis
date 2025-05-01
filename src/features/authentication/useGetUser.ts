import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

const REFETCH_INTERVAL = 30 * 1000

export function useGetUser() {
  const { isPending, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    refetchInterval: REFETCH_INTERVAL
  });

  return { isPending, user, isAuthenticated: user?.role === "authenticated" };
}
