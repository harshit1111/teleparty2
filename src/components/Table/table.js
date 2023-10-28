import styled from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
  margin: auto;
  padding: 2rem;
  margin-top: 5rem;
  width: 80%;
`;

const StyledHeader = styled.div`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  display: flex;

  & div{
    width: 50%;
    text-align: center;
  }

`;

const StyledRow = styled.div`
  padding: 1.2rem 2.4rem;
  display: flex;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  & div{
    width: 50%;
    text-align: center;
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.2rem;
  gap: 10px;

  & button{
    padding: 0.5rem 1rem;
    gap: 15px;
    outline: none;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background: var(--color-grey-200);
    color: black;
    margin-right: 10px;

    &:disabled{
      cursor: not-allowed;
    }
  }
`;


function Table({ children }) {
  return (
      <StyledTable role="table">{children}</StyledTable>
  );
}

function Header({ children }) {
  return (
    <StyledHeader role="row" as="header">
      {children}
    </StyledHeader>
  );
}
function Row({ children }) {
  return (
    <StyledRow role="row">
      {children}
    </StyledRow>
  );
}

function Body({ data, error , render }) {
  if (!data.length) return <Empty>{error || 'No data to show at the moment'}</Empty>;

  return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
