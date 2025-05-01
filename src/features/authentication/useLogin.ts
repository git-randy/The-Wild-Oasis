import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin () {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginAPI,
    onSuccess: (data) => {

      // Manually set data for query
      console.log(`Manually setting user query data: ${data.user}`)
      queryClient.setQueryData(["user"], data.user)
      navigate("/dashboard", {replace: true})
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })

  return {isPending, login }
}