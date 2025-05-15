import styled, {css} from "styled-components";

interface Props {
  as: string;
}

const Heading = styled.h1<Props>`
  ${props => props.as === "h1" &&
  css`
    font-size: 3rem;
    font-weight: 600;
    `
  }
  ${props => props.as === "h2" &&
  css`
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
    `
  }
  ${props => props.as === "h3" &&
  css`
    font-size: 2rem;
    font-weight: 500;
    `
  }
   ${props => props.as === "h4" &&
  css`
    font-size: 3rem;
    font-weight: 600;
    text-align: center
    `
  }

`;

export default Heading