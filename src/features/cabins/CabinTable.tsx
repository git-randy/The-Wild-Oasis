import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useGetCabins } from "./useGetCabins";
import { useSearchParams } from "react-router-dom";
import { Discount, CabinSort } from "../../utils/blueprints";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

function CabinTable() {
  const { isPending, cabins } = useGetCabins();
  const [searchParams] = useSearchParams();

  // searchParams.get values are null at initial load
  const discountValue = searchParams.get(Discount.ParamName) || Discount.All;
  let filteredCabins;

  if (discountValue === Discount.All) {
    filteredCabins = cabins;
  } else if (discountValue === Discount.With) {
    filteredCabins = cabins?.filter((cabin) => cabin.discount !== 0);
  } else {
    filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);
  }

  // searchParams.get values are null at initial load
  // TODO: Name is not sorting correctly if the name is a number as a string
  const sortValue =
    searchParams.get(CabinSort.ParamName) || CabinSort.NameAscLabel;
  const [field, direction] = sortValue.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins?.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <>
      {isPending ? (
        <Spinner />
      ) : (
        <Menus>
          <Table columns="0.5fr 1.2fr 1.5fr 1fr 1fr 2fr">
            <Table.Header>
              <div></div>
              <div>Cabin</div>
              <div>Capacity</div>
              <div>Price</div>
              <div>Discount</div>
              <div></div>
            </Table.Header>
            <Table.Body
              data={sortedCabins}
              render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
            />
          </Table>
        </Menus>
      )}
    </>
  );
}

export default CabinTable;
