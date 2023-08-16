import {gql} from '@apollo/client'
export const SIGNUP_USER = gql`
    mutation createUser($userNew:UserInput!){
        user:signupUser(userNew:$userNew){ 
           firstName
        }
    }
`
export const LOGIN_USER = gql`
mutation SigninUser($userSignin:UserSigninInput!){
    user:signinUser(userSignin:$userSignin){ 
      token
    }
  }
`
export const EDIT_QUOTE = gql`
  mutation EditQuote($quoteId: ID!, $quoteUpdates: QuoteEditInput!) {
    editQuote(quoteId: $quoteId, quoteUpdates: $quoteUpdates) {
      _id
      name
      length
      width
      height
    }
  }`

export const CREATE_QUOTE = gql`
  mutation createQuote($quoteNew:QuoteInput!){
    quote:createQuote(quoteNew:$quoteNew){
      name
      length
      width
      height
      by
    
    }
  }
`
export const DELETE_USER = gql`
  mutation DeleteUser($userId: ID!) {
    deleteUser(userId: $userId)
  }
`
export const DELETE_QUOTE = gql`
  mutation DeleteQuote($quoteId: ID!) {
    deleteQuote(quoteId: $quoteId)
  }
`;