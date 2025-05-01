import { useMutation, useQueryClient } from "@tanstack/react-query";
import { copyCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDuplicateCabin() {
  const queryClient = useQueryClient();

  const { isPending, mutate: duplicateCabin } = useMutation({
    mutationFn: copyCabin,
    onSuccess: () => {
      toast.success("Duplicated cabin successfully");
      // Invalidate cabins query so react query can fetch up-to-date data after inserting
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  })

  return {isPending, duplicateCabin}
};