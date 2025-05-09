import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useGetBookings } from "./useGetBookings";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import { PAGE_SIZE } from "../../utils/constants";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
// import { PageURLQuery } from "../../utils/blueprints";

function BookingTable() {
  // const [searchParams] = useSearchParams()
  const { isPending, bookings, count } = useGetBookings();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.get("page")) {
      searchParams.set("page", "1");
      setSearchParams(searchParams);
    }
  }, []);

  if (isPending) return <Spinner />;

  if (!bookings) return <Empty resourceName="bookings" />;

  // Client-side pagination if data is small
  // const currentPage = Number(searchParams.get(PageURLQuery.ParamName))

  // const begin = (PAGE_SIZE * currentPage) - PAGE_SIZE

  // const end = (PAGE_SIZE * currentPage)

  // const paginatedBookings = bookings.slice(begin, end)

  return (
    <>
      <Menus>
        <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
          <Table.Header>
            <div>Cabin</div>
            <div>Guest</div>
            <div>Dates</div>
            <div>Status</div>
            <div>Amount</div>
            <div></div>
          </Table.Header>

          <Table.Body
            data={bookings}
            render={(booking) => (
              <BookingRow key={booking.id} booking={booking} />
            )}
          />
          <Table.Footer>
            <Pagination totalResults={count} pageSize={PAGE_SIZE}></Pagination>
          </Table.Footer>
        </Table>
      </Menus>
    </>
  );
}

export default BookingTable;
