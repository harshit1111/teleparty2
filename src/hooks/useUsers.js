import { useCallback, useEffect, useState } from "react";
import { apiEndPoints } from "../services/apiEndpoints";

const PAGE_SIZE=30;

export function useUsers(searchValue , pageNumber){

    const [usersData , setUsersData] = useState([]);
    const [error,setError] = useState('');
    const [isLoading , setIsLoading] = useState(false);
    const [totalCount,setTotalCount] = useState(0);

    const getUserFollwersData = useCallback(async (data) => {
        if(!data || !Array.isArray(data)){
          return;
        }
        try{
          setIsLoading(true);
          const getFollwersPromise = data.map(user => {
            const endPoint = `${apiEndPoints.getUserData}/${user.login}`
            return fetch(endPoint,{
              headers:{
                'Authorization': `token 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`
              }
            })
          })
          const newUsersData = [...data]
          try{
            let values = await Promise.allSettled(getFollwersPromise)
            values = await Promise.allSettled(values.map(value => value.value.json()));
            values.forEach((entry,index) => {
              if(entry.status === "fulfilled"){
                const followersCount = entry.value.followers;
                newUsersData[index].followersCount = followersCount;
              }  
            })
            setUsersData(newUsersData)
          }catch(err){
          setError(err.message)
        }finally{
          setIsLoading(false);
        }
        
      }
      catch(err){
        setError(err.message)
      }
    },[])

    async function getUsersData(controller){
      setIsLoading(true);
      setError('');
      try{
        let res = await fetch(`${apiEndPoints.getUsers}?q=${searchValue}&page=${pageNumber}` , {headers:{
          'Authorization': `token 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` // hardcoded for now due to issues with deployment
        }, signal : controller.signal});
        if(!res.ok){
          throw new Error("Something went wrong")
        }
        res = await res.json();
        setUsersData(res.items || []);
        setTotalCount(res.total_count);
        getUserFollwersData(res.items);
      }catch(error){
        setError(error.message)
        setIsLoading(false);
      }
    }
  
    useEffect(() => {
        const controller = new AbortController();
        let timer = null;
        (function(){
            if(searchValue){
              timer = setTimeout(async () => {
                getUsersData(controller);
              },500)
            }else{
              setUsersData([]);
            }
          })()

          return () => {
            controller.abort();
          clearTimeout(timer);
        }
    },[searchValue,getUserFollwersData,pageNumber])

    let totalPages = Math.floor(totalCount/PAGE_SIZE);
    if(totalCount%PAGE_SIZE){
      totalPages++;
    }

    return {usersData , isLoading , error , totalPages}
}