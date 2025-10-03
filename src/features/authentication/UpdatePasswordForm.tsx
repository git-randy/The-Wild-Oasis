import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUpdateUser } from "./useUpdateUser";
import { useGetUser } from "./useGetUser";

type PasswordFormData = {
  password?: string;
  passwordConfirm?: string;
}

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;
  const { updateUser, isPending } = useUpdateUser();
  const { user } = useGetUser();

  const isGuest = user?.email === "guest@guest.com"

  const onSubmit: SubmitHandler<PasswordFormData> = ({password}) => {
    updateUser({password}, {onSuccess: () => reset()})
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {isGuest &&
        <FormRow
          label="Message"
        >
          <p>Password cannot be updated on this account</p>
        </FormRow>
      }
      <FormRow
        label="Password (min 6 characters)"
        error={errors.password && String(errors?.password?.message)}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isPending || isGuest}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors.passwordConfirm && String(errors?.passwordConfirm?.message)}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isPending || isGuest}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow>
        <Button onClick={reset} type="reset" design="secondary">
          Reset
        </Button>
        <Button design="primary" disabled={isPending || isGuest}>Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
