import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
import { BookingSort } from "./blueprints";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { paramValue: "all", label: "All" },
          { paramValue: "checked-out", label: "Checked out" },
          { paramValue: "checked-in", label: "Checked in" },
          { paramValue: "unconfirmed", label: "Unconfirmed" },
        ]}
      />

      <SortBy
        options={[
          { paramValue: BookingSort.StartDateDesc, label: "Sort by date (recent first)" },
          { paramValue: BookingSort.StartDateAsc, label: "Sort by date (earlier first)" },
          {
            paramValue: BookingSort.TotalPriceDesc,
            label: "Sort by amount (high first)",
          },
          { paramValue: BookingSort.TotalPriceAsc, label: "Sort by amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
