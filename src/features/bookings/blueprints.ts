import { CabinAPIData } from "../cabins/blueprints"
import { GuestAPIData } from "../../utils/blueprints";

export interface BookingAPIData {
  id: number;
  created_at: string;
  start_date: string;
  end_date: string;
  num_nights: number;
  num_guests: number;
  cabin_price: number;
  extras_price: number;
  total_price: number;
  status: "unconfirmed" | "checked-in" | "checked-out";
  has_breakfast: boolean;
  is_paid: boolean;
  observations: string;
  guests: GuestAPIData;
  cabins: CabinAPIData;
}

export interface BookingUpdateData {
  id: number;
  created_at?: string;
  start_date?: string;
  end_date?: string;
  num_nights?: number;
  num_guests?: number;
  cabin_price?: number;
  extras_price?: number;
  total_price?: number;
  status?: "unconfirmed" | "checked-in" | "checked-out";
  has_breakfast?: boolean;
  is_paid?: boolean;
  observations?: string;
  guests?: GuestAPIData;
  cabins?: CabinAPIData;
}

export interface NewBookingData {
  start_date: string;
  end_date: string;
  num_nights: number;
  num_guests: number;
  cabin_price?: number;
  extras_price?: number;
  total_price?: number;
  status: "unconfirmed" | "checked-in" | "checked-out";
  has_breakfast: boolean;
  is_paid: boolean;
  observations?: string;
  guest_id: number;
  cabin_id: number;
}

export interface GuestsAPIData {
  id: number;
  created_at: string;
  full_name?: string;
  first_name: string;
  last_name: string;
  email: string;
  national_id: number;
  nationality: string;
  country_flag: string;
}

export interface GuestFormData {
  full_name?: string;
  first_name: string;
  last_name: string;
  email: string;
  national_id?: number;
  nationality: string;
  country_flag?: string;
}

export interface GetBookingsResponse {
  data: BookingAPIData[];
  count: number;
}

export enum BookingStatusColor {
  unconfirmed = "blue",
  "checked-in" = "green",
  "checked-out" =  "silver",
}

export enum BookingSort {
  ParamName = "sortBy",
  StartDateAsc = "start_date-asc",
  StartDateDesc = "start_date-desc",
  TotalPriceAsc = "total_price-asc",
  TotalPriceDesc = "total_price-desc"
}

export enum BookingStatus {
  ParamName = "status",
  All = "all",
  CheckedOut = "checked-out",
  CheckedIn = "checked-in",
  Unconfirmed = "unconfirmed"
}