import { formatDistance, parseISO } from "date-fns";
import { differenceInDays } from "date-fns";

/* We want to make this function work for both Date objects and strings
(which come from Supabase)
*/
export const subtractDates = (dateStr1: string, dateStr2: string) =>
  differenceInDays(parseISO(dateStr1), parseISO(dateStr2));

export const formatDistanceFromNow = (dateStr: string) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

/* Supabase needs an ISO date string. However, that string will be different
  on every render because the MS or SEC have changed, which isn't good.
  So we use this trick to remove any time
  */

interface getTodayArgs {
  end?: boolean;
}

export const getToday = (options: getTodayArgs = {}) => {
  const today = new Date();

  /* This is necessary to compare with created_at from Supabase, because it is
  not at 0.0.0.0, so we need to set the date to be END of the day when we
  compare it with earlier dates
  */
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value: number, format="en") =>
  new Intl.NumberFormat(format, { style: "currency", currency: "USD" }).format(
    value
  );

export const title = (value: string): string => {
  /**
   * Capitalize the first letter in a string
   * @param {string} value - A string value
   * @returns {string} - "hello world" => "Hello world"
   */
  return String(value).charAt(0).toUpperCase() + String(value).slice(1);
};

export const appendDuplicateNum = (value: string): string => {
  /**
   * Append a number to a string in parentheses.
   *
   * @param {string} value - A string value
   * @returns {string} - Example: testfile -> testfile(2)
   */
  const hasAppendedNum = value.substring(
    value.indexOf("(") + 1,
    value.lastIndexOf(")")
  );

  if (hasAppendedNum) {
    // Remove existing appended num and increment
    const newValue = value.replace(/\(\d+\)/, "");
    const incrementNum = Number(hasAppendedNum) + 1;
    return newValue + `(${incrementNum})`;
  } else {
    return value + "(2)";
  }
};
