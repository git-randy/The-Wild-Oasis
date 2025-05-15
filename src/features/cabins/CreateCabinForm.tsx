import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import { CabinFormData, AddNewCabinData } from "./blueprints";
import FormRow from "../../ui/FormRow";
import toast from "react-hot-toast";
import FormButtonRow from "../../ui/FormButtonRow";
import FormHeader from "../../ui/FormHeader";
import { useModal } from "../../ui/Modal";
import { useCreateCabin } from "./useCreateCabin";

const VALID_IMG_FILES = [".jpg", ".jpeg", ".png"];

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
  const { setIsModalVisible } = useModal();

  const { isPending, createCabin } = useCreateCabin();

  const onSubmit = async (cabin: object) => {
    const cabinData = cabin as CabinFormData;
    const updatedFormObj = { ...cabinData, image: cabinData?.image?.[0] };

    createCabin(
      updatedFormObj as AddNewCabinData,
      {
        onSuccess: () => {
        setIsModalVisible(false);
        reset();
      },
        onError: (err) => {
          toast.error((t) => (
            <div style={{display: "flex", alignContent: "center"}}>
              {err.message}
              <button onClick={() => toast.dismiss(t.id)}>Dismiss</button>
            </div>)
          )
        }
    })};

  const onError: SubmitErrorHandler<Omit<CabinFormData, "image">> = (
    errors
  ) => {
    const errorObjects = Object.values(errors);
    toast.error((errorObjects[0].message ??= "Please fill in every field"));
  };

  return (
    <Form type="modal" onSubmit={handleSubmit(onSubmit, onError)}>
      <FormHeader>Add New Cabin</FormHeader>
      <FormRow
        label="Cabin name"
        error={errors.name && String(errors.name.message)}
      >
        <Input
          type="text"
          id="name"
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
          defaultValue={0}
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
          defaultValue=""
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
            required: "An image is required",
            validate: (value: FileList) => {
              const errorMsg = `We only accept these file formats: (${VALID_IMG_FILES.join(
                ")("
              )})`;
              const extension = value[0].name.split(".").pop();
              if (extension) {
                return VALID_IMG_FILES.includes(`.${extension}`) || errorMsg;
              } else {
                return `Invalid file. ${errorMsg}`;
              }
            },
          })}
        />
      </FormRow>
      <FormButtonRow>
        <Button
          type="button"
          size="small"
          onClick={() => setIsModalVisible(false)}
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

export default CreateCabinForm;