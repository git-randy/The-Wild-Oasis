import { useMutation } from "@tanstack/react-query";
import { signUp as signUpAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate: signUp, isPending } = useMutation({
    mutationFn: signUpAPI,
    onSuccess: (user) => {
      console.log("Success. User data:")
      console.log(user);
      toast.success(
        "Account successfully created. Please verify the user's email address"
      );
    },
  });

  return { signUp, isPending };
}
