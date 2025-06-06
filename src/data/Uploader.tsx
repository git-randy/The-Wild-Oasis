import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import supabase from "../services/superbase";
import Button from "../ui/Button";
import { subtractDates } from "../utils/helpers";

import { bookings } from "./data-bookings";
import { cabins } from "./data-cabins";
import { guests } from "./data-guests";
import toast from "react-hot-toast";

// const originalSettings = {
//   minBookingLength: 3,
//   maxBookingLength: 30,
//   maxGuestsPerBooking: 10,
//   breakfastPrice: 15,
// };

async function deleteGuests() {
  const { error } = await supabase.from("guests").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteCabins() {
  const { error } = await supabase.from("cabins").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteBookings() {
  const { error } = await supabase.from("bookings").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function createGuests() {
  const { error } = await supabase.from("guests").insert(guests);
  if (error) console.log(error.message);
}

async function createCabins() {
  const { error } = await supabase.from("cabins").insert(cabins);
  if (error) console.log(error.message);
}

async function createBookings() {
  /**
    Bookings need a guest_id and a cabin_id. We can't tell Supabase IDs
    for each object, it will calculate them on its own.
    So it might be different for different people, especially after
    multiple uploads. Therefore, we need to first get all
    guest_ids and cabin_ids, and then replace the original IDs in the
    booking data with the actual ones from the DB
  */
  const { data: guestsIds } = await supabase
    .from("guests")
    .select("id")
    .order("id");
  const { data: cabinsIds } = await supabase
    .from("cabins")
    .select("id")
    .order("id");

  if (guestsIds && cabinsIds) {
    const allGuestIds = guestsIds.map((cabin) => cabin.id);

    const allCabinIds = cabinsIds.map((cabin) => cabin.id);

    const finalBookings = bookings.map((booking) => {
      // Here relying on the order of cabins, as they don't have an ID yet
      const cabin = cabins.at(booking.cabin_id - 1);
      const num_nights = subtractDates(booking.end_date, booking.start_date);
      const cabin_price = num_nights * (cabin!.regular_price - cabin!.discount);
      const extras_price = booking.has_breakfast
        ? num_nights * 15 * booking.num_guests
        : 0; // hardcoded breakfast price
      const total_price = cabin_price + extras_price;

      let status;
      if (
        isPast(new Date(booking.end_date)) &&
        !isToday(new Date(booking.end_date))
      )
        status = "checked-out";
      if (
        isFuture(new Date(booking.start_date)) ||
        isToday(new Date(booking.start_date))
      )
        status = "unconfirmed";
      if (
        (isFuture(new Date(booking.end_date)) ||
          isToday(new Date(booking.end_date))) &&
        isPast(new Date(booking.start_date)) &&
        !isToday(new Date(booking.start_date))
      )
        status = "checked-in";

      return {
        ...booking,
        num_nights,
        cabin_price,
        extras_price,
        total_price,
        guest_id: allGuestIds.at(booking.guest_id - 1),
        cabin_id: allCabinIds.at(booking.cabin_id - 1),
        status,
      };

    });

    const { error } = await supabase.from("bookings").insert(finalBookings);
    if (error) console.log(error.message);
  } else {
    console.error("Cabin IDs and Guest IDs could not be found in the database")
  }
}

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    // Bookings need to be deleted FIRST
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();

    // Bookings need to be created LAST
    await createGuests();
    await createCabins();
    await createBookings();

    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }

  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "var(--color-indigo-100)",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3>SAMPLE DATA</h3>
      <h4>Remove in production</h4>
      <Button onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>

      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload bookings ONLY
      </Button>
      <Button onClick={() => toast.success("Testing")}>Test Toast</Button>
    </div>
  );
}

export default Uploader;
