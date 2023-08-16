import React,{useEffect} from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_QUOTES } from '../gqloperations/queries';
import { DELETE_QUOTE } from '../gqloperations/mutations';

export default function Home() {
   const {loading,error,data} = useQuery(GET_ALL_QUOTES);
   const [deleteQuote] = useMutation(DELETE_QUOTE, {
    refetchQueries: [{ query: GET_ALL_QUOTES }],
  });
   if(loading) return <h1>Loading</h1>
   if(error){
       console.log(error.message)
   }
   if(data.quotes.length === 0){
    return  <h2>No Quotes available</h2>
   }

   const handleDelete = async (quoteId) => {
    console.log('Handling delete for quoteId:', quoteId);
  
    try {
        await deleteQuote({
          variables: {
            quoteId,
          },
        });
      } catch (error) {
      console.error('Error deleting quote:', error);
    }
  };
    return (
        <div className="container">
            {
                data.quotes.map(quote=>{
                    return(
                   <blockquote>
                       <h6>{quote._id}</h6>
                        <h6>{quote.name}</h6>
                        <h6>{quote.length}</h6>
                            <h6>{quote.width}</h6>
                            <h6>{quote.height}</h6>
                            <button onClick={() => handleDelete(quote._id)}>Delete Data</button>
                        <p>------------------------</p>
                        
                    
                        {/* <p className="right-align">~{quote.by.firstName}</p> */}
                    </blockquote>
                    )
                })
            }
            
        </div>
    )
}
