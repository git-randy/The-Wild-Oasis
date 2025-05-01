import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { BookingAPIData, BookingStatusColor } from "./blueprints";
import Menus from "../../ui/Menus";
import { HiEye } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { HiArrowDownOnSquare } from "react-icons/hi2";
import { GiExitDoor } from "react-icons/gi";
import { useCheckOut } from "../check-in-out/useCheckOut";
import { IconContext } from "react-icons";
import { FaTrashCan } from "react-icons/fa6";
import { useDeleteBooking } from "./useDeleteBooking";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

// TODO: Fix re-renders when just clicking on context menu button

type BookingRowProps = {
  booking: BookingAPIData;
};

function BookingRow({ booking }: BookingRowProps) {
  const statusToTagName = BookingStatusColor;
  const navigate = useNavigate();
  const { isPending: isDeleting, deleteBooking } = useDeleteBooking()
  const { isPending: isCheckingOut, checkOut } = useCheckOut();

  return (
    <Table.Row>
      <Cabin>{booking.cabins.name}</Cabin>

      <Stacked>
        <span>{booking.guests.full_name}</span>
        <span>{booking.guests.email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(booking.start_date))
            ? "Today"
            : formatDistanceFromNow(booking.start_date)}{" "}
          &rarr; {booking.num_nights} night stay
        </span>
        <span>
          {format(new Date(booking.start_date), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(booking.end_date), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[booking.status]}>
        {booking.status.replace("-", " ")}
      </Tag>

      <Amount>{formatCurrency(booking.total_price)}</Amount>

      <Menus.Menu>
        <Menus.Toggle id={String(booking.id)} />
        <Menus.List id={String(booking.id)}>
          <Menus.Button
            icon={<HiEye />}
            onClick={() => navigate(`/bookings/${booking.id}`)}
            disabled={isDeleting}
          >
            See details
          </Menus.Button>

          {booking.status === "unconfirmed" && (
            <Menus.Button
              icon={<HiArrowDownOnSquare />}
              onClick={() => navigate(`/checkin/${booking.id}`)}
              disabled={isDeleting}
            >
              Check In
            </Menus.Button>
          )}
          {booking.status === "checked-in" && (
            <Menus.Button
              icon={<GiExitDoor />}
              onClick={() => checkOut(booking.id)}
              disabled={isCheckingOut || isDeleting}
            >
              Check Out
            </Menus.Button>
          )}
          <Menus.Button
            icon={
              <IconContext.Provider value={{ color: "red" }}>
                <FaTrashCan />
              </IconContext.Provider>
            }
            onClick={() => deleteBooking(booking.id)}
            disabled={isDeleting}
          >
            Delete
          </Menus.Button>
        </Menus.List>
      </Menus.Menu>
    </Table.Row>
  );
}

export default BookingRow;
