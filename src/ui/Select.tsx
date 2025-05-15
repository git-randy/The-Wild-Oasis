import styled from "styled-components";

type StyledSelectProps = {
  type?: string;
};

const borderColor: Record<string, string> = {
  white: "var(--color-grey-100)",
  black: "var(--color-grey-700)",
};

const Select = styled.select<StyledSelectProps>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white" ? borderColor["white"] : borderColor["black"]};
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
  width: 100%;
`;

export default Select;
