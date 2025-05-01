import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isPending, mutate: createCabin } = useMutation({
    mutationFn: addNewCabin,
    onSuccess: () => {
      toast.success("Cabin added successfully");
      // Invalidate cabins query so react query can fetch up-to-date data after inserting
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  })

  return {isPending, createCabin}
};