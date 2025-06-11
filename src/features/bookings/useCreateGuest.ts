import { useMutation } from "@tanstack/react-query";
import { addGuest as addGuestAPI } from "../../services/apiGuests";
import toast from "react-hot-toast";
import { GuestFormData } from "./blueprints";

export function useAddGuest() {
  const {isPending, mutateAsync: addGuest} = useMutation({
    mutationFn: (value: GuestFormData) => addGuestAPI(value),
    onSuccess: () => {
      toast.success("Guest added successfully");
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })

  return { isPending, addGuest }
}

export default useAddGuest