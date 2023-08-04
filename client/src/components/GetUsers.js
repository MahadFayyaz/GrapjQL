import React,{useEffect} from 'react'
import { useQuery } from '@apollo/client';
import { GET_ALL_USERS } from '../gqloperations/queries';

export default function GetUsers() {
   const {loading,error,data} = useQuery(GET_ALL_USERS)

   if(loading) return <h1>Loading</h1>
   if(error){
       console.log(error.message)
   }
   if(data.users.length == 0){
    return  <h2>No Users available</h2>
   }
    return (
        <div className="container">
            {
                data.users.map(user=>{
                    return(
                   <blockquote>
                        <h6>{user.firstName}</h6>
                        <h6>{user.lastName}</h6>
                        <h6>{user.email}</h6>
                        <button>Assign task</button>
                        {/* <p className="right-align">~{user}</p> */}
                    </blockquote>
                    )
                })
            }
            
        </div>
    )
}
