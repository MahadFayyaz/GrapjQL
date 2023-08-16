import {gql} from "apollo-server"
const typeDefs = gql`
 type Query{
    users:[User]
    user(_id:ID!):User
    quotes:[QuoteWithName]
    quote(_id:ID!):Quote
    iquote(by:ID!):[Quote]
    myprofile:User
 }

 type QuoteWithName{
    _id:ID
     name:String
     length:String
     height:String  
     width:String
     by:IdName
 }
 
 type IdName{
     _id:String
     firstName:String
 }

 type User{
     _id:ID!
     firstName:String!
     lastName:String!
     email:String!
     password:String!
     quotes:[Quote]
 }
 type Quote{
     _id: ID!
     name:String!
     length:String!
     width:String!
     height:String!
     users:[User]
     by:ID!
 }

 type Token{
     token:String!
 }

 type Mutation{
     signupUser(userNew:UserInput!):User
     signinUser(userSignin:UserSigninInput!):Token
     createQuote(quoteNew:QuoteInput!):Quote
     editQuote(quoteId: ID!, quoteUpdates: QuoteEditInput!): Quote
     deleteQuote(quoteId: ID!): Boolean
     deleteUser(userId: ID!): Boolean
 }

 input UserInput{
    firstName:String!
    lastName:String!
    email:String!
    password:String!
 }
 input UserSigninInput{
    email:String!
    password:String!
 }
 input QuoteEditInput{
    length:String
    width:String
    height:String
 }

 input QuoteInput{
    name:String!
    length:String
    width:String
    height:String
 }

`
export default typeDefs