import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import useRecentStays from "./useRecentStays";
import Stats from "./Stats";
import { useGetCabins } from "../cabins/useGetCabins";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isPending: bookingsLoading, bookings } = useRecentBookings();
  const { isPending: staysLoading, confirmedStays, numDays } = useRecentStays();
  const { isPending: cabinsLoading, cabins } = useGetCabins();

  if (bookingsLoading || staysLoading || cabinsLoading) return <Spinner />;

  console.log(bookings);
  console.log(confirmedStays);
  console.log(cabins);

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        cabinCount={cabins?.length}
        numDays={Number(numDays)}
      />
      <div>Today's activities</div>
      <div>Chart stay duartions</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
