import { ReactElement } from "react";
import { styled } from "styled-components";
import Error from "./Error";

const StyledFormDateRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 20rem 20rem 22rem 20rem;

  gap: 0.7rem;
  padding: 1.2rem 0;
`;

const Label = styled.label`
  font-weight: 500;
`;

type Props = {
  label?: string;
  error?: string;
  children: ReactElement<HTMLElement>[] | ReactElement<HTMLElement>;
}

function FormDateRow({ label, error, children, ...rest }: Props) {
  const id = Array.isArray(children) ? children[0].props.id : children.props.id;

  return (
    <StyledFormDateRow {...rest}>
      {label && <Label htmlFor={id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormDateRow>
  );
}

export default FormDateRow;
