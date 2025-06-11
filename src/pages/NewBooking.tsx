// Once a customer has checked in, the status needs to update to "checked-in"
// and is_paid needs to be set to true in the database

import { useState } from "react";
import BookingCabinForm from "../features/bookings/BookingCabinForm";
import BookingGuestForm from "../features/bookings/BookingGuestForm";
import { GuestAPIData } from "../utils/blueprints";
import Heading from "../ui/Heading";
import { Carousel } from "../ui/Carousel";

function NewBooking() {
  const [guest, setGuest] = useState<GuestAPIData>();

  return (
    <>
      <Heading as="h1">New Booking</Heading>
        <Carousel>
          <BookingGuestForm setGuest={setGuest} />
          <BookingCabinForm guest={guest}/>
        </Carousel>
    </>
  );
}

export default NewBooking;
