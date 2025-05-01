import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useGetUser } from "./useGetUser";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data,
  // because we know that it has already been loaded at this point
  const { user } = useGetUser();
  const { updateUser, isPending } = useUpdateUser()
  const email = user?.email;
  const currentFullName = user?.user_metadata.fullName;

  const [fullName, setFullName] = useState<string | undefined>(currentFullName);
  const [avatar, setAvatar] = useState<File | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    updateUser({fullName, avatar})
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isPending}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          disabled={isPending}
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setAvatar(e.target.files[0]);
            }
          }}
        />
      </FormRow>
      <FormRow>
        <Button type="reset" design="secondary" disabled={isPending}>
          Cancel
        </Button>
        <Button disabled={isPending}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
