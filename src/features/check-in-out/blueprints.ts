import { BookingAPIData } from "../bookings/blueprints"

export interface ActivityAPIData extends Omit<BookingAPIData, "guests"> {
  guests: {
    full_name: string,
    nationality: string,
    country_flag: string
  }
}