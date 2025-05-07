import Filter from "../../ui/Filter"

function DashboardFilter() {
  return (
    <Filter
      filterField='last'
      options={[
        { paramValue: '7', label: 'Last 7 days' },
        { paramValue: '30', label: 'Last 30 days' },
        { paramValue: '90', label: 'Last 90 days' },
      ]}
    />
  );
}

export default DashboardFilter;
