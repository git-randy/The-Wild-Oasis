import { BookingAPIData } from "../bookings/blueprints";

export interface StayAPIData extends Omit<BookingAPIData, "guests" | "cabins">{
  guests: {full_name: string};
}

export interface BookingsAfterDateData {
  created_at: string;
  total_price: number;
  extras_price: number;
}