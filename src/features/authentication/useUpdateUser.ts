import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient()

  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: updateUserAPI,
    onSuccess: (user) => {
      toast.success("User successfully updated")
      queryClient.setQueryData(["user"], user)
      // queryClient.invalidateQueries({queryKey: ["user"]})
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })

  return { updateUser, isPending }
}