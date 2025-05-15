import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import { CabinAPIData, CabinFormData, EditCabinData } from "./blueprints";
import FormRow from "../../ui/FormRow";
import toast from "react-hot-toast";
import FormButtonRow from "../../ui/FormButtonRow";
import FormHeader from "../../ui/FormHeader";
import { useEditCabin } from "./useEditCabin";

const VALID_IMG_FILES = [".jpg", ".jpeg", ".png"];

type Props = {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  cabinRowData: CabinAPIData;
};

function EditCabinForm({ setIsVisible, cabinRowData }: Props) {
  const { register, handleSubmit, getValues, formState } = useForm();
  const { errors } = formState;
  const { isPending, editCabin } = useEditCabin()

  const onSubmit = async (cabin: object) => {
    const formData = cabin as CabinFormData;
    const updatedFormObj = {
      ...formData,
      image: formData?.image?.[0],
      id: cabinRowData.id,
    };

    editCabin(
      updatedFormObj as EditCabinData,
      {
        onSuccess: () => setIsVisible(false)
      }
    );
  };

  const onError: SubmitErrorHandler<Omit<CabinFormData, "image">> = (
    errors
  ) => {
    const errorObjects = Object.values(errors);
    toast.error((errorObjects[0].message ??= "Please fill in every field"));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormHeader>Edit {cabinRowData.name} Cabin</FormHeader>
      <FormRow
        label="Cabin name"
        error={errors.name && String(errors.name.message)}
      >
        <Input
          type="text"
          id="name"
          defaultValue={cabinRowData.name}
          disabled={isPending}
          {...register("name", { required: "Name is required" })}
        />
      </FormRow>
      <FormRow
        label="Max capacity"
        error={errors.max_capacity && String(errors.max_capacity.message)}
      >
        <Input
          type="number"
          id="maxCapacity"
          min={0}
          max={6}
          defaultValue={cabinRowData.max_capacity}
          disabled={isPending}
          {...register("max_capacity", {
            required: "Max capacity is required",
            min: { value: 1, message: "Max capacity must at least be 1" },
          })}
        />
      </FormRow>

      <FormRow
        label="Price per night"
        error={errors.regular_price && String(errors.regular_price.message)}
      >
        <Input
          type="number"
          id="regularPrice"
          min={0}
          defaultValue={cabinRowData.regular_price}
          disabled={isPending}
          spinbutton="false"
          {...register("regular_price", {
            valueAsNumber: true,
            required: "A price is required",
          })}
        />
      </FormRow>

      <FormRow
        label="Discount"
        error={errors.discount && String(errors.discount.message)}
      >
        <Input
          type="number"
          id="discount"
          min={0}
          disabled={isPending}
          spinbutton="false"
          defaultValue={cabinRowData.discount}
          {...register("discount", {
            valueAsNumber: true,
            validate: (value) =>
              value <= getValues().regular_price ||
              "Discount can't be greater than the price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description"
        error={errors.description && String(errors.description.message)}
      >
        <Textarea
          id="description"
          defaultValue={cabinRowData.description}
          disabled={isPending}
          {...register("description", {
            required: "A description is required",
          })}
        />
      </FormRow>

      <FormRow label="Image">
        <FileInput
          id="image"
          accept="image/*"
          disabled={isPending}
          {...register("image", {
            validate: (value: FileList) => {
              if (value.length > 0) {
                const errorMsg = `We only accept these file formats:
                (${VALID_IMG_FILES.join(" | ")})`;
                const extension = value[0].name.split(".").pop();
                if (extension) {
                  return VALID_IMG_FILES.includes(`.${extension}`) || errorMsg;
                } else {
                  return errorMsg;
                }
              }
            },
          })}
        />
      </FormRow>
      <FormButtonRow>
        <Button
          type="reset"
          size="small"
          onClick={() => setIsVisible(false)}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button design="primary" size="small" disabled={isPending}>
          Submit
        </Button>
      </FormButtonRow>
    </Form>
  );
}

export default EditCabinForm;
