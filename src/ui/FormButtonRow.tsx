import { ReactElement } from "react";
import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-200);
  }

  &:has(button) {
    display: flex;
    justify-content: center;
    gap: 1.2rem;
  }
`;

interface Props {
  children: ReactElement<HTMLButtonElement>[];
}

function FormButtonRow({ children }: Props) {
  return (
    <StyledFormRow>
      {children}
    </StyledFormRow>
  );
}

export default FormButtonRow;
