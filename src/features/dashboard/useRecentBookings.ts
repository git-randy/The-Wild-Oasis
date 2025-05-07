import { useQuery } from "@tanstack/react-query"
import { subDays } from "date-fns"
import { useSearchParams } from "react-router-dom"
import { getBookingsAfterDate } from "../../services/apiBookings"

export function useRecentBookings() {
  const [ searchParams ] = useSearchParams()

  const numDays = searchParams.get("last")

  const queryDate = subDays(new Date(), Number(numDays)).toISOString()

  const {isPending, data: bookings, error } = useQuery({
    // Like a dependency array. We already have a bookings key so we
    // add another dependency to refetch when numDays changes
    queryKey: ["bookings", `last-${numDays}`],
    queryFn: () => getBookingsAfterDate(queryDate)
  })

  return { isPending, bookings, error}
}

export default useRecentBookings