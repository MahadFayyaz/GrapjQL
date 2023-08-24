import {gql} from '@apollo/client'
export const GET_ALL_QUOTES = gql`
query getAllQuotes{
    quotes{
      _id
      name
      length 
      width
      height
      by{
        _id
        firstName
      }
    }
  }
`
export const GET_ALL_USERS = gql`
query getAllUsers{
    users{
      _id
      firstName
      lastName
      email
      role
      quotes{
        name
      }
    }
  }
`
export const QUOTES_ASSIGNED_TO_USER = gql`
  query QuotesAssignedToUser($userId: ID!) {
    quotesAssignedToUser(userId: $userId) {
      _id
      name
      length
      width
      height
    }
  }
`

export const GET_MY_PROFILE = gql`
  query getMyProfile{
    user:myprofile{
      _id
      firstName
      lastName
      email
      role
      quotes{
        _id
        name
      }
    } 
  }

`

export const GET_USER_BY_ID = gql`
query getUserById($userid: ID!) {
  user(_id: $userid) {
    _id
    firstName
    lastName
    email
    role
    quotes{
      name
    }
  }
}

`

