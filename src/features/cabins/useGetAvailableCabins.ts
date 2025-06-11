import { useQuery } from "@tanstack/react-query"
import { getAvailableCabins } from "../../services/apiCabins"

export function useGetAvailableCabins(startDate: string, endDate: string) {

  const { isPending, data: cabins, error } = useQuery({
    queryKey: ["available-cabins"],
    queryFn: () => getAvailableCabins(startDate, endDate),
  })

  return { isPending, cabins, error }
}
