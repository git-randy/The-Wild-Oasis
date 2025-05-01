import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckOut() {
  const queryClient = useQueryClient();

  const { isPending, mutate: checkOut } = useMutation({
    mutationFn: (bookingId: number) =>
      updateBooking({ id: bookingId, status: "checked-out" }),
    onSuccess: () => {
      toast.success("Customer successfully checked out");
      // Invalidate all active queries
      queryClient.invalidateQueries()
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isPending, checkOut };
}
