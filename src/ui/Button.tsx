// import styled from "styled-components";

import styled, { css, RuleSet } from "styled-components";

const sizes: Record<string, RuleSet<object>> = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations: Record<string, RuleSet<object>> = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover:enabled {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover:enabled {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover:enabled {
      background-color: var(--color-red-800);
    }
  `,
  edit: css`
    background-color: var(--color-grey-300);

  &:hover:enabled {
    background-color: var(--color-grey-400);
  }
`,
};

interface Props {
  size?: "small" | "medium" | "large";
  design?: "primary" | "secondary" | "danger" | "edit";
}

const Button = styled.button<Props>`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: (var(--shadow-sm));
  /* & references the current element. Same as writing button:hover */
  /* &:hover {
    background-color: var(--color-brand-800)
  } */
  ${(props) => props.size ? sizes[props.size] : sizes["medium"]}
  ${(props) => props.design ? variations[props.design] : variations["secondary"]}
`;

export default Button;
