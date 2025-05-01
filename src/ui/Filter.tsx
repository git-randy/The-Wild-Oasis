import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

type FilterButtonProps = {
  active?: boolean;
};

const FilterButton = styled.button<FilterButtonProps>`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
  &:disabled {
    background-color: var(--color-brand-600);
  }
`;

type Props = {
  filterField: string;
  options: { label: string; paramValue: string }[];
};

function Filter({ filterField, options }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Set default query params for filter
    if (!searchParams.get(filterField)) {
      setSearchParams((params) => {
        params.set(filterField, options[0].paramValue)
        return params
      })
    }
  }, [searchParams])

  const currentFilter = searchParams.get(filterField);

  const handleClick = (value: string) => {
    searchParams.set(filterField, value);
    if (searchParams.get("page") !== "1" ) searchParams.set("page", "1")
    setSearchParams(searchParams);
  };

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.paramValue}
          onClick={() => handleClick(option.paramValue)}
          active={currentFilter === option.paramValue}
          disabled={currentFilter === option.paramValue}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
