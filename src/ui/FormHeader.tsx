import styled from "styled-components";

const StyledFormHeaderDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size:24px;
  margin-bottom: 2rem;
`;

function FormHeader ({children}: {children: React.ReactNode}) {
  return(
  <>
    <StyledFormHeaderDiv>
      <header>
        {children}
      </header>
    </StyledFormHeaderDiv>
  </>
  )
}

export default FormHeader