import { useState } from "react";
import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Modal from "../ui/Modal";
import Row from "../ui/Row";
import NewBookingForm from "../features/bookings/NewBookingForm";

function Bookings() {
  const [formVisible, setFormVisible] = useState<boolean>(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Bookings</Heading>
        <Button
          design="primary"
          size="medium"
          onClick={() => setFormVisible(true)}
        >
          New Booking
        </Button>
        {formVisible && (
          <Modal setIsModalVisible={setFormVisible}>
            <NewBookingForm />
          </Modal>
        )}
        <BookingTableOperations />
      </Row>
      <BookingTable />
    </>
  );
}

export default Bookings;
