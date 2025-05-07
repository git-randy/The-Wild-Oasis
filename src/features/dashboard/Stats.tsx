import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Empty from "../../ui/Empty";
import { BookingsAfterDateData, StayAPIData } from "./blueprints";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

type StatsProps = {
  bookings: BookingsAfterDateData[] | undefined;
  confirmedStays: StayAPIData[] | undefined;
  cabinCount: number | undefined;
  numDays: number | undefined;
};

function Stats({ bookings, confirmedStays, cabinCount, numDays }: StatsProps) {
  if (!bookings || !confirmedStays) return <Empty resourceName="Stats" />;

  let numBookings = 0;
  let sales = 0;
  let occupancyRate = 0;
  const totalCheckIns = confirmedStays ? confirmedStays.length : 0;

  if (bookings) {
    numBookings = bookings.length;

    sales = bookings.reduce((acc, current) => acc + current.total_price, 0);
  }

  if (confirmedStays && cabinCount && numDays) {
    occupancyRate =
      confirmedStays.reduce((acc, curr) => acc + curr.num_nights, 0) /
      (cabinCount * numDays);
  }

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check-Ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={totalCheckIns}
      />
      <Stat
        title="Occupancy Rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={`${Math.round(occupancyRate * 100)}%`}
      />
    </>
  );
}

export default Stats;
