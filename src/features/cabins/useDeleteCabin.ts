import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabinById } from "../../services/apiCabins";

export function useDeleteCabin() {

  const queryClient = useQueryClient()

  const { isPending, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinById, //Automatically inserts any argument
    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      // Invalidate cabins query so react query can fetch up-to-date data after deleting
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {isPending, deleteCabin}
}