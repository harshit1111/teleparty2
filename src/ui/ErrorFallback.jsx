import { styled } from "styled-components"


const StyledErrorFallback = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Box = styled.div`
    padding: 4rem;
    background-color: white;
`
export default function ErrorFallback({ err }){
  
    return(
        <StyledErrorFallback>
             <Box>
             <h1>Something went wrong</h1>
             <h2>{ err }</h2>
             </Box>
        </StyledErrorFallback>
      
    )

} 