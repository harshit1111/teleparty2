
import { useState } from 'react';
import Search from './components/Search/Search';
import { useUsers } from './hooks/useUsers';
import Table from './components/Table/table';
import Container from './ui/Conatiner';
import Spinner from './ui/Spinner';

function App() {

  const [searchValue , setSearchValue] = useState('');
  const [pageNumber , setPageNumber] = useState(1);
  const {usersData , isLoading , error , totalPages} =  useUsers(searchValue,pageNumber);
  

  function handleNextPage(){
    if(pageNumber === totalPages){
      return;
    }
    setPageNumber((previous) => previous+1);
  }

  function handlePreviousPage(){
    if(pageNumber === 1){
      return;
    }
    setPageNumber((previous => previous-1));
  }
  function handleSearchInput(event){
      setSearchValue(event.target.value);
  }

  function getSortedDataByFollowersCount(data){
    if(!data || !Array.isArray(data)){
      return [];
    }

    return data.sort((a,b) => {
      return a.followersCount - b.followersCount
    })
  }
  return (
    <main>
      <Container>
        <Search 
          placeholder="Search For Users here"
          value={searchValue} 
          onChange={handleSearchInput}/>
        <Table>
          <Table.Header>
            <div>USER NAME</div>
            <div>FOLLOWERS</div>
          </Table.Header>
          {isLoading ? < Spinner></Spinner>: null}
          {error ? <h1 style={{ textAlign : "center" , marginTop: "2rem" }}>{error.message || 'Something went wrong'}</h1> : null}
          {!isLoading && !error ? 
          <>
          <Table.Body
            data={getSortedDataByFollowersCount(usersData)}
            error={error}
            render={(userData) => (
              <Table.Row key={userData?.login}>
                  <div>{userData?.login}</div>
                  <div>{userData?.followersCount}</div>
              </Table.Row>
            )}
          /> 
          <Table.Footer>
            <div>
            <button onClick={handlePreviousPage} disabled={pageNumber === 1}>
              PREVIOUS
            </button>
            <button onClick={handleNextPage} disabled={pageNumber >= totalPages}>
              NEXT
            </button>
            </div>
            <p>Shwoing {totalPages > 0 ?  pageNumber: 0} of {totalPages}</p>
           
          </Table.Footer>
          </>:null}
        </Table>
      </Container>
    </main>
  );
}

export default App;
