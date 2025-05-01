import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBookingById } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient()

  const {isPending, mutate: deleteBooking} = useMutation({
    mutationFn: deleteBookingById,
    onSuccess: () => {
      toast.success("Booking successfully deleted")
      queryClient.invalidateQueries({queryKey: ["bookings"]})
      queryClient.invalidateQueries({queryKey: ["booking"]})
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })

  return { isPending, deleteBooking }
}