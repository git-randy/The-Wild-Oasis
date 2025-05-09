// import { getToday } from "../utils/helpers";
import {
  BookingAPIData,
  BookingUpdateData,
  GetBookingsResponse,
} from "../features/bookings/blueprints";
import { PAGE_SIZE } from "../utils/constants";
import { getBookingsQuery } from "../features/bookings/constants";
import supabase from "./superbase";
import { getToday } from "../utils/helpers";
import {
  BookingsAfterDateData,
  StayAPIData,
} from "../features/dashboard/blueprints";
import { ActivityAPIData } from "../features/check-in-out/blueprints";

type QueryArgs = {
  field?: string;
  value?: string;
  method?: "eq" | "lte" | "gte";
};

type SortByArgs = {
  field: string;
  direction: string;
};

export async function getBookings(
  {
    filter,
    sortBy,
  }: {
    filter: QueryArgs;
    sortBy: SortByArgs;
  },
  pageNumber: number = 0
): Promise<GetBookingsResponse> {
  let query = supabase
    .from("bookings")
    .select(getBookingsQuery, { count: "exact" });
  if (Object.keys(filter).length !== 0) {
    const methodMap = {
      eq: (q: typeof query) => q.eq(filter.field!, filter.value),
      gte: (q: typeof query) => q.gte(filter.field!, filter.value),
      lte: (q: typeof query) => q.lte(filter.field!, filter.value),
    };
    query = methodMap[filter.method!](query);
  }

  if (Object.keys(sortBy).length !== 0) {
    const modifier = sortBy.direction === "asc" ? true : false;
    query = query.order(sortBy.field, { ascending: modifier });
  }

  if (pageNumber) {
    const begin = PAGE_SIZE * pageNumber - PAGE_SIZE;
    const end = PAGE_SIZE * pageNumber - 1;

    query = query.range(begin, end);
  }

  const { data, error, count } = await query;

  if (error) {
    throw new Error("Unable to retrieve bookings");
  }
  return { data, count } as unknown as GetBookingsResponse;
}

export async function getBooking(id: string): Promise<BookingAPIData> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error(`Booking id '${id}' was not found`);
  }
  return data;
}

export async function updateBooking(booking: BookingUpdateData) {
  const { data, error } = await supabase
    .from("bookings")
    .update(booking)
    .eq("id", booking.id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error(`Booking id ${booking.id} could not be updated`);
  }
  return data;
}

export async function deleteBookingById(id: number) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}

// Returns all BOOKINGS that are were created after the given date.
// Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(
  date: string
): Promise<BookingsAfterDateData[]> {
  /**
   * @param {string} date - An ISO string of a date
   * @returns {object} - Returns a data object
   */

  // Get bookings on when they were created
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, total_price, extras_price")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error(`Could not get bookings after ${date}`);
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: string): Promise<StayAPIData[]> {
  /**
   * @param {string} date - An ISO string of a date
   * @returns {object} - Returns a data object
   */

  // Get bookings on when the customer will arrive
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(full_name)")
    .gte("start_date", date)
    .lte("start_date", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity(): Promise<ActivityAPIData[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(full_name, nationality, country_flag)")
    .or(
      `and(status.eq.unconfirmed,start_date.eq.${getToday()}),and(status.eq.checked-in,end_date.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}
