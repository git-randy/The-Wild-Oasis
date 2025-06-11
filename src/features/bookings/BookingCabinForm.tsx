import { Controller, useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import Button from "../../ui/Button";
import FormButtonRow from "../../ui/FormButtonRow";
import Heading from "../../ui/Heading";
import SpinnerMini from "../../ui/SpinnerMini";
import DatePicker from "react-datepicker";
import { getAvailableCabins } from "../../services/apiCabins";
import { CabinAPIData } from "../cabins/blueprints";
import { differenceInDays } from "date-fns";
import { useCreateBooking } from "./useCreateBooking";
import Textarea from "../../ui/Textarea";
import { GuestAPIData } from "../../utils/blueprints";
import { useCarousel } from "../../ui/Carousel";
import { NewBookingData } from "./blueprints";

type CabinBookingFormData = {
  dates: [Date | null, Date | null];
  cabin: string;
  numGuests: string;
  hasBreakfast: string;
  isPaid: string;
  notes: string;
};

function BookingCabinForm({ guest }: { guest: GuestAPIData | undefined }) {
  const { setPrevItem } = useCarousel();
  const { isPending: bookingPending, addNewBooking } = useCreateBooking();
  const { register, handleSubmit, formState, control, reset } =
    useForm<CabinBookingFormData>();
  const { errors } = formState;
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;
  const [noDateRange, setNoDateRange] = useState(true);
  const [cabinsLoading, setCabinsLoading] = useState(false);
  const [cabins, setCabins] = useState<CabinAPIData[]>([]);
  const [maxCapacity, setMaxCapacity] = useState<number>(0);

  useEffect(() => {
    const fetchCabinsOnDateChange = async () => {
      if (dateRange[1] === null || dateRange[0] === null) {
        setNoDateRange(true);
        setMaxCapacity(0);
        setCabins([]);
      } else {
        try {
          setNoDateRange(false);
          setCabinsLoading(true);
          const cabins = await getAvailableCabins(
            dateRange[0].toISOString(),
            dateRange[1].toISOString()
          );
          setCabinsLoading(false);
          setCabins(cabins);
          setMaxCapacity(cabins[0].max_capacity);
        } catch (err) {
          setCabinsLoading(false);
          throw err;
        }
      }
    };

    fetchCabinsOnDateChange();
  }, [dateRange]);

  const onSubmit = async (data: CabinBookingFormData) => {
    if (cabins) {
      const cabinObj =
        cabins[cabins.findIndex((cabin) => cabin.name === data.cabin)];
      const [startDate, endDate] = dateRange.map((date) => date?.toISOString());
      const numGuests = Number(data.numGuests);
      const numNights = Math.abs(
        differenceInDays(startDate as string, endDate as string)
      );
      const extrasPrice = data.hasBreakfast === "true" ? 15 : 0
      const totalPrice = extrasPrice * numNights * numGuests

      const updatedObj = {
        num_guests: numGuests === 0 ? numGuests + 1 : numGuests,
        start_date: startDate,
        end_date: endDate,
        status: "unconfirmed",
        num_nights: numNights,
        cabin_price: cabinObj.regular_price,
        has_breakfast: data.hasBreakfast === "true",
        extras_price: extrasPrice,
        total_price: totalPrice,
        is_paid: data.isPaid === "true",
        observations: data.notes,
        cabin_id: cabinObj.id,
        guest_id: guest?.id,
      };
      addNewBooking(updatedObj as NewBookingData, {
        onSuccess: () => {
          reset();
          setPrevItem();
        },
      });
    }
  };

  const handleCabinChange = (e: BaseSyntheticEvent) => {
    const selectedCabin = cabins.find((cabin) => cabin.name === e.target.value);
    setMaxCapacity(selectedCabin?.max_capacity!);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Heading as="h2" style={{ marginBottom: "1.2rem" }}>
          Cabin Information
        </Heading>
        <FormRow label="Dates" noButtonEnd error={""}>
          <Controller
            control={control}
            name="dates"
            render={({ field }) => (
              <DatePicker
                id="dates"
                placeholderText="Select dates"
                onChange={(dates) => {
                  setDateRange(dates);
                }}
                minDate={new Date()}
                customInput={<Input textAlign="center" />}
                selectsRange
                onBlur={field.onBlur}
                startDate={startDate}
                endDate={endDate}
                preventOpenOnFocus
                enableTabLoop={false}
                dateFormat={"yyyy-MM-dd"}
                disabled={bookingPending}
              />
            )}
          />
        </FormRow>
        <FormRow
          label="Available Cabins"
          error={errors.cabin && String(errors.cabin.message)}
        >
          {noDateRange ? (
            <p>Select a date range for available cabins</p>
          ) : cabinsLoading ? (
            <SpinnerMini />
          ) : (
            <Select
              id="cabin"
              disabled={bookingPending}
              {...register("cabin", {
                required: "Select a date range",
                onChange: handleCabinChange,
              })}
            >
              {cabins?.map((cabin) => (
                <option
                  key={cabin.id}
                  value={cabin.name}
                >{`Cabin ${cabin.name}`}</option>
              ))}
            </Select>
          )}
        </FormRow>
        <FormRow label="Number of Guests">
          <Select id="numGuests" defaultValue="1" disabled={noDateRange} {...register("numGuests")}>
            {Array.from({ length: maxCapacity }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </Select>
        </FormRow>
        <FormRow label="Include Breakfast?">
          <Select
            id="hasBreakfast"
            defaultValue="true"
            {...register("hasBreakfast", {
              required: "Select a breakfast option",
            })}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </Select>
        </FormRow>
        <FormRow
          label="isPaid"
          error={errors.isPaid && String(errors.isPaid.message)}
        >
          <Select
            id="isPaid"
            defaultValue="false"
            {...register("isPaid", { required: "Required" })}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </Select>
        </FormRow>
        <FormRow label="Notes" {...register("notes")}>
          <Textarea id="notes" name="notes" defaultValue="" />
        </FormRow>

        <FormButtonRow>
          <Button type="button" design="secondary" onClick={setPrevItem}>
            Back
          </Button>
          <Button
            type="submit"
            design="primary"
            disabled={noDateRange}
          >
            Submit
          </Button>
        </FormButtonRow>
      </Form>
    </>
  );
}

export default BookingCabinForm;
