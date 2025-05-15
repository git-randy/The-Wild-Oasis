import styled, { css } from "styled-components";

type Props = {
  type?: string;
}

const Form = styled.form<Props>`
  ${(props) =>
    props.type !== "modal" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border-bottom: 2px solid var(--color-grey-400);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
    `}

  overflow: hidden;
  font-size: 1.4rem;
`;

export default Form;
