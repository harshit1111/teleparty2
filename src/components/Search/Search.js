import { styled } from "styled-components"

const StyledInput = styled.input`
    display: block;
    margin: auto;
    width: 60%;
    outline: none;
    border: none;
    border-bottom: 2px solid var(--color-grey-400);;
    padding: 0.5rem 2rem;
    border-radius: 5px;

    &::placeholder{
        text-transform: capitalize;
        letter-spacing: 0.4px;
    }

    &:focus{
        outline:none;
    }
`


export default function Search({ value , onChange , placeholder}){
    return(
        <StyledInput type="text" placeholder={placeholder} value={value} onChange={onChange}>

        </StyledInput>
    )
}