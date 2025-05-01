import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

export function useEditSettings() {
  const queryClient = useQueryClient();

  const { isPending, mutate: updateSettings } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Settings updated successfully");
      // Invalidate cabins query so react query can fetch up-to-date data after inserting
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  })

  return {isPending, updateSettings}
};