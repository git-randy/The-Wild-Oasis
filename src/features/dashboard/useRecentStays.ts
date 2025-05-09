import { useQuery } from "@tanstack/react-query"
import { subDays } from "date-fns"
import { useSearchParams } from "react-router-dom"
import { getStaysAfterDate } from "../../services/apiBookings"
import { ConfirmedStaysData } from "./blueprints"

export function useRecentStays() {
  const [ searchParams ] = useSearchParams()

  const numDays = searchParams.get("last")

  const queryDate = subDays(new Date(), Number(numDays)).toISOString()

  const {isPending, data: stays, error } = useQuery({
    queryKey: ["stays", `last-${numDays}`],
    queryFn: async () => {
      const staysAfterDate = await getStaysAfterDate(queryDate)
      return staysAfterDate.filter((stay) => {
        return stay.status === "checked-in" || stay.status === "checked-out"
      }) as ConfirmedStaysData[]
    },
  })

  return { isPending, stays, error, numDays}
}

export default useRecentStays