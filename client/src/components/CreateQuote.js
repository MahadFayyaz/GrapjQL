import React,{useState} from 'react'
import { useMutation } from '@apollo/client';
import { CREATE_QUOTE } from '../gqloperations/mutations';
import { GET_ALL_QUOTES } from '../gqloperations/queries';

export default function CreateQuote() {
    const [quote,setQuote] = useState({})
    const [createQuote,{loading,error,data}] = useMutation(CREATE_QUOTE,{
        refetchQueries:[
            'getAllQuotes',
            'getMyProfile'
        ]
    })
    const handleChange = (e)=>{
        setQuote({
         ...quote,
         [e.target.name]:e.target.value
        })
    
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        createQuote({
            variables:{
                quoteNew:quote
            }
        })
    }
    if(loading) return <h1>Loading</h1>

    if(error){
        console.log(error.message)
    }
    if(data){
        console.log(data)
    }
    return (
        <div className="container my-container">
            {
                error && 
                <div className="red card-panel">{error.message}</div>
            }
            {
                data && 
                <div className="green card-panel">{data.quote}</div>
            }
            <form onSubmit={handleSubmit}>
                <input 
                type="text" 
                name="name"
                onChange={handleChange}
                placeholder="write your information here"
                />
                    <input
                 type="text"
                 placeholder="length"
                 name="length"
                 onChange={handleChange}
                 required
                 />
                <input
                 type="text"
                 placeholder="width"
                 name="width"
                 onChange={handleChange}
                 required
                 />
                 <input
                 type="text"
                 placeholder="height"
                 name="height"
                 onChange={handleChange}
                 required
                 />
                 <button className="btn green" type='submit'>Add info</button>  
            </form>
            
        </div>
    )
}
