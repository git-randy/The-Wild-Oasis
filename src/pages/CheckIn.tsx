import CheckinBooking from "../features/check-in-out/CheckinBooking"

// Once a customer has checked in, the status needs to update to "checked-in"
// and is_paid needs to be set to true in the database

function CheckIn() {
  return (
    <CheckinBooking/>
  )
}

export default CheckIn