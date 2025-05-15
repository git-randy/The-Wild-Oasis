import styled from "styled-components";

type StyledSelectProps = {
  type?: string;
};

const borderColor: Record<string, string> = {
  white: "var(--color-grey-100)",
  black: "var(--color-grey-700)",
};

const StyledSelect = styled.select<StyledSelectProps>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white" ? borderColor["white"] : borderColor["black"]};
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

type Props = {
  options: { label: string; paramValue: string }[];
  value: string;
  onChange: (arg0: React.ChangeEvent<HTMLSelectElement>) => void;
  type?: string;
  // Accept all native <select> attributes in ...rest
};

function FilterSelect({ options, value, onChange, ...rest }: Props) {
  return (
    <>
      <StyledSelect type="white" value={value} onChange={onChange} {...rest}>
        {options.map((option) => (
          <option key={option.paramValue} value={option.paramValue}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    </>
  );
}

export default FilterSelect;
