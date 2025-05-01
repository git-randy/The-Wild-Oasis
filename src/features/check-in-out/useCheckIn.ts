import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckIn() {
  const queryClient = useQueryClient()

  const { isPending, mutate: checkIn } = useMutation({
    mutationFn: updateBooking,
    onSuccess: () => {
      toast.success("Customer successfully checked in")
      // Invalidate booking to react query can fetch up-to-date data
      queryClient.invalidateQueries({
        queryKey:["booking"]
      })
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })

  return {isPending, checkIn}
}