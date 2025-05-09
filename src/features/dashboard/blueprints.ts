import { BookingAPIData } from "../bookings/blueprints";

export interface StayAPIData extends Omit<BookingAPIData, "guests" | "cabins">{
  guests: {full_name: string};
}

export interface ConfirmedStaysData extends Omit<StayAPIData, "status">{
  status: "checked-in" | "checked-out"
}

export interface BookingsAfterDateData {
  created_at: string;
  total_price: number;
  extras_price: number;
}