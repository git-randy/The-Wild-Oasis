import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import { EMAIL_REGEX } from "../../utils/constants";
import FormButtonRow from "../../ui/FormButtonRow";
import Heading from "../../ui/Heading";
import { GuestFormData } from "./blueprints";
import useAddGuest from "./useCreateGuest";
import { GuestAPIData } from "../../utils/blueprints";
import { useCarousel } from "../../ui/Carousel";

function BookingGuestForm({
  setGuest,
}: {
  setGuest: React.Dispatch<React.SetStateAction<GuestAPIData | undefined>>;
}) {
  const { setNextItem} = useCarousel();
  const { isPending: guestUploading, addGuest } = useAddGuest();
  const { register, handleSubmit, formState, reset } = useForm<GuestFormData>();
  const { errors } = formState;
  const [countries, setCountries] =
    useState<{ name: string; code: string }[]>();

  useEffect(() => {
    fetch("/countries.json")
      .then((res) => res.json())
      .then(setCountries)
      .catch((err) => console.error("Failed to load countries:", err));
  }, []);

  if (!countries) return <p>Missing countries.json file</p>;

  const onSubmit = (data: GuestFormData) => {
    const countryCode =
      countries[
        countries.findIndex((country) => country.name === data.nationality)
      ].code;
    const updatedGuestData = {
      ...data,
      full_name: data.first_name + data.last_name,
      country_flag: `https://flagcdn.com/${countryCode.toLowerCase()}.svg`,
    };
    addGuest(updatedGuestData, { onSuccess: (data) => {
      setGuest(data)
      setNextItem();
    }});
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Heading as="h2" style={{ marginBottom: "1.2rem" }}>
          Guest Information
        </Heading>
        <FormRow
          label="First name"
          error={errors.first_name && String(errors.first_name.message)}
        >
          <Input
            type="text"
            id="first_name"
            placeholder="Guest first name..."
            disabled={guestUploading}
            {...register("first_name", { required: "First name is required" })}
          />
        </FormRow>
        <FormRow
          label="Last name"
          error={errors.last_name && String(errors.last_name.message)}
        >
          <Input
            type="text"
            id="last_name"
            disabled={guestUploading}
            placeholder="Guest last name..."
            {...register("last_name", { required: "Last name is required" })}
          />
        </FormRow>
        <FormRow
          label="Email"
          error={errors.email && String(errors.email.message)}
        >
          <Input
            type="text"
            id="email"
            disabled={guestUploading}
            placeholder="Guest email address..."
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: EMAIL_REGEX,
                message: "Please enter a valid email address",
              },
            })}
          />
        </FormRow>
        <FormRow
          label="Country"
          error={errors.nationality && String(errors.nationality.message)}
        >
          <Select
            id="nationality"
            defaultValue=""
            disabled={guestUploading}
            {...register("nationality", {
              required: "Please select a country",
              validate: (value) => value !== "" || "A country must be selected",
            })}
          >
            <option value="" disabled>
              Select a country
            </option>
            {countries ? (
              countries.map(({ name }) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))
            ) : (
              <option key="no-data" value="no-data">
                Countries could not be loaded
              </option>
            )}
          </Select>
        </FormRow>
        <FormButtonRow>
          <Button
            type="reset"
            design="secondary"
            onClick={() => reset()}
            disabled={guestUploading}
          >
            Reset
          </Button>
          <Button type="submit" design="primary" disabled={guestUploading}>
            Next
          </Button>
        </FormButtonRow>
      </Form>
    </>
  );
}

export default BookingGuestForm;
