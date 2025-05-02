import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignUp } from "./useSignUp";
import { signUpFormData } from "./blueprints";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { isPending, signUp } = useSignUp();

  const onSubmit = (data: object) => {
    console.log(data);

    signUp(data as signUpFormData, {onSettled: () => reset()});
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormRow
        label="Full name"
        error={errors.fullName && String(errors.fullName.message)}
      >
        <>
          <Input
            type="text"
            id="fullName"
            disabled={isPending}
            {...register("fullName", { required: "This field is required" })}
          />
        </>
      </FormRow>

      <FormRow
        label="Email address"
        error={errors.email && String(errors.email.message)}
      >
        <>
          <Input
            type="email"
            id="email"
            disabled={isPending}
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please enter a valid email address",
              },
            })}
          />
        </>
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors.password && String(errors.password.message)}
      >
        <>
          <Input
            type="password"
            id="password"
            disabled={isPending}
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password must be 8 characters or more",
              },
            })}
          />
        </>
      </FormRow>

      <FormRow
        label="Repeat password"
        error={errors.passwordConfirm && String(errors.passwordConfirm.message)}
      >
        <>
          <Input
            type="password"
            id="passwordConfirm"
            disabled={isPending}
            {...register("passwordConfirm", {
              required: "This field is required",
              validate: (value) => {
                return (
                  value === getValues().password || "Passwords need to match"
                );
              },
            })}
          />
        </>
      </FormRow>

      <FormRow>
        <>
          {/* type is an HTML attribute! */}
          <Button design="secondary" type="reset" disabled={isPending} onClick={reset}>
            Clear Form
          </Button>
          <Button design="primary" disabled={isPending}>
            Create new user
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
