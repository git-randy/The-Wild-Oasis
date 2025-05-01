import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {

  const queryClient = useQueryClient()

  const { isPending, mutate: editCabin } = useMutation({
    mutationFn: updateCabin,
    onSuccess: () => {
      toast.success("Cabin edited successfully");
      // Invalidate cabins query so react query can fetch up-to-date data
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  })

  return { isPending, editCabin}
};