import { styled } from "styled-components"

const StyledContainer = styled.div`
    width: 80%;
    margin: auto;
    padding: 2rem;
    margin-top: 2rem;
`

export default function Container({children}){
    return(
        <StyledContainer>
            {children}
        </StyledContainer>
    )
}