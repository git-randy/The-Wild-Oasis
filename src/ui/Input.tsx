import styled, { css } from "styled-components";

/*
  Passing in a boolean value to an unrecognized prop by HTML gives a
  false positive error. A workaournd: https://stackoverflow.com/a/57194646/4363111
*/

interface Props {
  spinbutton?: "false";
}

const Input = styled.input<Props>`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: (var(--shadow-sm));
  width: 100%;
  ${(props) =>
    props.spinbutton === "false" &&
    css`
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    `}
`;

export default Input;
