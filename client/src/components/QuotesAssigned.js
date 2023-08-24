import React from 'react';
import { useQuery } from '@apollo/client';
import { QUOTES_ASSIGNED_TO_USER, GET_MY_PROFILE } from '../gqloperations/queries';
import EditQuoteForm from './EditQuoteForm';

function QuotesAssignedToCurrentUser() {
  const { loading: profileLoading, error: profileError, data: profileData } = useQuery(GET_MY_PROFILE);
  const loggedInUserId = profileData?.user?._id;

  const { loading, error, data } = useQuery(QUOTES_ASSIGNED_TO_USER, {
    variables: {
      userId: loggedInUserId,
    },
  });

  if (profileLoading) return <p>Loading...</p>;
  if (profileError) return <p>Error: {profileError.message}</p>;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const quotes = data.quotesAssignedToUser;

  return (
    <div>
      <h2>Quotes Assigned to You</h2>
      <ul>
        {quotes.map((quote) => (
          <li key={quote._id}>
            {quote.name} - Length: {quote.length}, Width: {quote.width}, Height: {quote.height}
          
           <EditQuoteForm
           key={quote._id} quoteId={quote._id} quote={quote}
           />
           </li>
        ))}
      </ul>
    </div>
  );
}

export default QuotesAssignedToCurrentUser;