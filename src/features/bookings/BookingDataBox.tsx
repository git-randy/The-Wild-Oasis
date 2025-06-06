import styled from "styled-components";
import { format, isToday } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";

import DataItem from "../../ui/DataItem";
import { Flag } from "../../ui/Flag";

import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";
import { BookingAPIData } from "./blueprints";
import { memo, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import { useDeleteBooking } from "./useDeleteBooking";
import { useNavigate } from "react-router-dom";

const StyledBookingDataBox = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

type PriceProps = {
  isPaid?: boolean;
};

const Price = styled.div<PriceProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
  color: ${(props) =>
    props.isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

type BookingDataBoxProps = {
  booking: BookingAPIData;
};

// A purely presentational component
const BookingDataBox = memo(function BookingDataBox({
  booking,
}: BookingDataBoxProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { isPending: isDeleting, deleteBooking } = useDeleteBooking();
  const navigate = useNavigate();

  const {
    created_at,
    start_date,
    end_date,
    num_nights,
    num_guests,
    cabin_price,
    extras_price,
    total_price,
    has_breakfast,
    observations,
    is_paid,
    guests: {
      full_name: guestName,
      email,
      nationality,
      country_flag,
      national_id,
    },
    cabins: { name: cabinName },
  } = booking;

  const handleDeleteBooking = async () => {
    await deleteBooking(booking.id);
    navigate("/bookings");
  };

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {num_nights} nights in Cabin <span>{cabinName}</span>
          </p>
        </div>

        <p>
          {format(new Date(start_date), "EEE, MMM dd yyyy")} (
          {isToday(new Date(start_date))
            ? "Today"
            : formatDistanceFromNow(start_date)}
          ) &mdash; {format(new Date(end_date), "EEE, MMM dd yyyy")}
        </p>
      </Header>

      <Section>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Guest>
            {country_flag && (
              <Flag src={country_flag} alt={`Flag of ${nationality}`} />
            )}
            <p>
              {guestName} {num_guests > 1 ? `+ ${num_guests - 1} guests` : ""}
            </p>
            <span>&bull;</span>
            <p>{email}</p>
            <span>&bull;</span>
            <p>National ID {national_id}</p>
          </Guest>
          <Button design="danger" onClick={() => setShowDeleteModal(true)}>
            <FaTrashCan />
          </Button>
        </div>
        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Observations"
          >
            {observations}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label="Breakfast included?">
          {has_breakfast ? "Yes" : "No"}
        </DataItem>

        <Price isPaid={is_paid}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price:`}>
            {formatCurrency(total_price)}

            {has_breakfast &&
              ` (${formatCurrency(cabin_price)} cabin + ${formatCurrency(
                extras_price
              )} breakfast)`}
          </DataItem>

          <p>{is_paid ? "Paid" : "Will pay at property"}</p>
        </Price>
      </Section>

      <Footer>
        <p>Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}</p>
      </Footer>
      {showDeleteModal && (
        <Modal setIsModalVisible={setShowDeleteModal} topPosition="25%">
          <h1>Are you sure you want to delete booking {booking.id}?</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              pointerEvents: isDeleting ? "none" : "auto",
              marginTop: "5%",
            }}
          >
            <Button
              design="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button design="danger" onClick={handleDeleteBooking}>
              Delete
            </Button>
          </div>
        </Modal>
      )}
    </StyledBookingDataBox>
  );
});

export default BookingDataBox;
