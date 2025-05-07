import { useQuery } from "@tanstack/react-query"
import { subDays } from "date-fns"
import { useSearchParams } from "react-router-dom"
import { getStaysAfterDate } from "../../services/apiBookings"

export function useRecentStays() {
  const [ searchParams ] = useSearchParams()

  const numDays = searchParams.get("last")

  const queryDate = subDays(new Date(), Number(numDays)).toISOString()

  const {isPending, data: stays, error } = useQuery({
    queryKey: ["stays", `last-${numDays}`],
    queryFn: () => getStaysAfterDate(queryDate),
  })

  const confirmedStays = stays?.filter((stay) => {
    return stay.status === "checked-in" || stay.status === "checked-out"
  })

  return { isPending, stays, confirmedStays, error, numDays}
}

export default useRecentStays