import styled from "styled-components";
import BookingDataBox from "../bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useGetBooking } from "../bookings/useGetBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckIn } from "./useCheckIn";
import { useNavigate } from "react-router-dom";
import { useGetSettings } from "../settings/useGetSettings";
import { BookingUpdateData } from "../bookings/blueprints";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

// TODO: Fix breakfast price. Fetch the price from settings.
// TODO: Fix back button going back to check in page after checking in

function CheckInBooking() {
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const [confirmPaid, setConfirmPaid] = useState<boolean>(false);
  const [addBreakfast, setAddBreakfast] = useState<boolean>(false);
  const { isPending, booking } = useGetBooking();
  const { isPending: isCheckingIn, checkIn } = useCheckIn();
  const { isPending: loadingSettings, settings } = useGetSettings();

  useEffect(() => {
    setConfirmPaid(booking?.is_paid ?? false);
  }, [booking?.is_paid]);

  useEffect(() => {
    setAddBreakfast(booking?.has_breakfast ?? false);
  }, [booking?.has_breakfast]);

  if (isPending) return <Spinner />;

  if (!booking || !settings)
    return <div>Could not load booking and settings data</div>;

  const {
    id: bookingId,
    guests: { full_name },
    total_price,
    num_guests,
    num_nights,
    status,
    is_paid,
  } = booking;

  console.log(status);
  const totalBreakfastPrice =
    settings.breakfast_price * num_guests * num_nights;

  const handleCheckin = async () => {
    const checkInData: BookingUpdateData = {
      id: booking.id,
      is_paid: true,
      status: "checked-in",
      extras_price: addBreakfast ? totalBreakfastPrice : 0,
      has_breakfast: addBreakfast,
    };

    await checkIn(checkInData);
    navigate(`/bookings/${bookingId}`);
  };

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText disabled={isCheckingIn} onClick={moveBack}>
          &larr; Back
        </ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {loadingSettings ? (
        <Spinner />
      ) : (
        <Box>
          <Checkbox
            checked={addBreakfast}
            id="breakfast"
            onChange={() => setAddBreakfast(!addBreakfast)}
            disabled={isCheckingIn}
          >
            Add breakfast to total price? ({formatCurrency(totalBreakfastPrice)}
            )
          </Checkbox>
        </Box>
      )}

      {!is_paid && (
        <Box>
          <Checkbox
            checked={confirmPaid}
            id="confirm"
            onChange={() => setConfirmPaid(!confirmPaid)}
            disabled={isCheckingIn}
          >
            I confirm {full_name} had paid the total amount of{" "}
            {addBreakfast
              ? `${formatCurrency(total_price + totalBreakfastPrice)}`
              : formatCurrency(total_price)}
          </Checkbox>
        </Box>
      )}

      <ButtonGroup>
        <Button
          design="primary"
          onClick={handleCheckin}
          disabled={!confirmPaid}
        >
          Check in booking #{bookingId}
        </Button>
        <Button disabled={isCheckingIn} design="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckInBooking;
