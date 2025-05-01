export const getBookingsQuery = `
    id, created_at, start_date, end_date, num_nights, num_guests,
    status, total_price, cabins(name), guests(full_name, email)
  `;

export const bookingIdParam = "bookingId"