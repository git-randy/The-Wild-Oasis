import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { BookingSort, BookingStatus } from "./blueprints";

export function useGetBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get(BookingStatus.ParamName);

  const filter =
    !filterValue || filterValue === BookingStatus.All
      ? {}
      : {
          field: BookingStatus.ParamName,
          value: filterValue,
          method: "eq" as const,
        };

  const sortByValue =
    searchParams.get(BookingSort.ParamName) || BookingSort.StartDateDesc;
  const [field, direction] = sortByValue.split("-");
  const sortBy = { field, direction };

  const pageNumber = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const { isPending, data, error } = useQuery({
    queryKey: ["bookings", filter, sortBy, pageNumber], // Like a dependency array
    queryFn: () => getBookings({ filter, sortBy }, pageNumber),
  });

  // Pre-fetching
  queryClient.prefetchQuery({
    queryKey: ["bookings"],
    queryFn: () => getBookings({ filter, sortBy }, pageNumber + 1),
  });

  const bookings = data?.data ?? [];
  const count = data?.count ?? 0;

  return { isPending, bookings, error, count };
}
