import { useNavigate } from "react-router-dom";
import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Bookings() {
  const navigate = useNavigate()

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Bookings</Heading>
        <Button design="primary" size="medium" onClick={() => navigate("/newbooking")}>
          New Booking
        </Button>
        <BookingTableOperations />
      </Row>
      <BookingTable />
    </>
  );
}

export default Bookings;
