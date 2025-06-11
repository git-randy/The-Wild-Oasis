import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCreateBooking() {
  const queryClient = useQueryClient()

  const {isPending, mutate: addNewBooking} = useMutation({
    mutationFn: addBooking,
    onSuccess: () => {
      toast.success("Booking successfully added")
      queryClient.invalidateQueries({queryKey: ["bookings"]})
      queryClient.invalidateQueries({queryKey: ["booking"]})
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })

  return { isPending, addNewBooking }
}