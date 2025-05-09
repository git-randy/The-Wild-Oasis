import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useGetBooking } from "./useGetBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useCheckOut } from "../check-in-out/useCheckOut";
import { BookingStatusColor } from "./blueprints";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { isPending, booking } = useGetBooking();
  const { isPending: isCheckingOut, checkOut } = useCheckOut();
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isPending) return <Spinner />;

  if (!booking) {
    return <Empty resourceName="booking"/>
  }

  const status = booking.status;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking {booking.id}</Heading>
          <Tag type={BookingStatusColor[status]}>
            {status.replace("-", " ")}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {booking.status === "unconfirmed" && (
          <Button
            design="primary"
            onClick={() => navigate(`/checkin/${booking.id}`)}
          >
            Check In
          </Button>
        )}
        {booking.status === "checked-in" && (
          <Button
            design="primary"
            onClick={() => checkOut(booking.id)}
            disabled={isCheckingOut}
          >
            Check Out
          </Button>
        )}
        <Button
          design="secondary"
          onClick={() =>
            status === "checked-in" ? navigate("/bookings") : moveBack
          }
        >
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
