import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      // Remove all queries
      queryClient.removeQueries()
      /*
        Replace option replaces the current page in the history stack
        with the new one, in this case "/login". Now the user can't go
        back to the previous page.
      */
      navigate("/login", {replace: true})
    }
  })

  return { logout, isPending }
}

