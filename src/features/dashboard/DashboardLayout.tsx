import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import useRecentStays from "./useRecentStays";
import Stats from "./Stats";
import { useGetCabins } from "../cabins/useGetCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isPending: bookingsLoading, bookings } = useRecentBookings();
  const { isPending: staysLoading, stays, numDays } = useRecentStays();
  const { isPending: cabinsLoading, cabins } = useGetCabins();

  if (bookingsLoading || staysLoading || cabinsLoading) return <Spinner />;

  return (
    <>
      <StyledDashboardLayout>
        <Stats
          bookings={bookings}
          confirmedStays={stays}
          cabinCount={cabins?.length}
          numDays={Number(numDays)}
        />
        <TodayActivity/>
        <DurationChart confirmedStays={stays} />
        <SalesChart bookings={bookings} numDays={Number(numDays)}/>
      </StyledDashboardLayout>
    </>
  );
}

export default DashboardLayout;
