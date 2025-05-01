import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import { Discount, CabinSort } from "../../utils/blueprints";
import { title } from "../../utils/helpers";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField={Discount.ParamName}
        options={[
          {
            label: title(Discount.All).replace("-", " "),
            paramValue: Discount.All,
          },
          {
            label: title(Discount.Without).replace("-", " "),
            paramValue: Discount.Without,
          },
          {
            label: title(Discount.With).replace("-", " "),
            paramValue: Discount.With,
          },
        ]}
      />
      <SortBy
        options={[
          { label: CabinSort.NameAscLabel, paramValue: CabinSort.NameAscValue },
          { label: CabinSort.NameDescLabel, paramValue: CabinSort.NameDescValue },
          {
            label: CabinSort.PriceAscLabel,
            paramValue: CabinSort.PriceAscValue,
          },
          {
            label: CabinSort.PriceDescLabel,
            paramValue: CabinSort.PriceDescValue,
          },
          {
            label: CabinSort.CapacityAscLabel,
            paramValue: CabinSort.CapacityAscValue,
          },
          {
            label: CabinSort.CapacityDescLabel,
            paramValue: CabinSort.CapacityDescValue,
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
