import React,{useEffect} from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_USERS } from '../gqloperations/queries';
import { DELETE_USER } from '../gqloperations/mutations';
export default function GetUsers({ userId }) {
   const {loading,error,data} = useQuery(GET_ALL_USERS);
   const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_ALL_USERS }],
  });
  const handleDelete = async (userId) => {
    try {
      const { data } = await deleteUser({
        variables: {
          userId,
        },
      });

      if (data.deleteUser) {
        console.log('User deleted successfully');
      } else {
        console.log('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

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
                        {user.quotes.map(quote=>{
                             {console.log("QUOTESNAME",  quote.name)};
                                return(
                               <h6> <li> {quote.name}</li></h6>    
                                )
                        })}                       
                        <button>Assign task</button>
                        <button className="right-align" onClick={() => handleDelete(user._id)}>Delete User</button>
                    </blockquote>
                    )
                })
            }
            
        </div>
    )
}
