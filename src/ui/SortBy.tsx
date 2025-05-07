import { useSearchParams } from "react-router-dom";
import Select from "./Select";
import { useEffect } from "react";

type Props = {
  options: { label: string; paramValue: string }[];
};

function SortBy({ options }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Set default query params for sort
    if (!searchParams.get("sortBy")) {
      setSearchParams((params) => {
        params.set("sortBy", options[0].paramValue);
        return params;
      });
    }
  }, [searchParams]);

  const currentSort = searchParams.get("sortBy") || options[0].paramValue;

  return (
    <Select
      options={options}
      type="white"
      value={currentSort}
      onChange={(e) => {
        setSearchParams(params => {
          searchParams.set("sortBy", e.target.value)
          return params
        })
      }}
    />
  );
}

export default SortBy;
