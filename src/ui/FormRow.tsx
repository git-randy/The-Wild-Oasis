import { HTMLAttributes, ReactElement } from "react";
import { css, styled } from "styled-components";
import Error from "../ui/Error";

type StyledFormRowProps = {
  gridTemplateColumns?: string;
};

const StyledFormRow = styled.div<StyledFormRowProps>`
  display: grid;
  align-items: center;

  ${(props) =>
    props.gridTemplateColumns
      ? css`
          grid-template-columns: ${props.gridTemplateColumns};
        `
      : css`
          grid-template-columns: 24rem 1.5fr 1.2fr;
        `}

  gap: 0;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

interface Props extends StyledFormRowProps, HTMLAttributes<HTMLDivElement> {
  label?: string;
  error?: string;
  children: ReactElement<HTMLElement>[] | ReactElement<HTMLElement>;
}

function FormRow({ label, error, children, ...rest }: Props) {
  const id = Array.isArray(children) ? children[0].props.id : children.props.id;

  return (
    <StyledFormRow {...rest}>
      {label && <Label htmlFor={id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
