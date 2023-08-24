import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_QUOTE } from '../gqloperations/mutations';
import { GET_ALL_QUOTES, GET_ALL_USERS } from '../gqloperations/queries';

export default function CreateQuote() {
  const [quote, setQuote] = useState({});
  const [assignedToUserId, setAssignedToUserId] = useState('');
  const [createQuote, { loading, error, data }] = useMutation(CREATE_QUOTE, {
    refetchQueries: ['getAllQuotes', 'getMyProfile'],
  });

  const { loading: usersLoading, error: usersError, data: usersData } = useQuery(GET_ALL_USERS);

  const handleChange = (e) => {
    setQuote({
      ...quote,
      [e.target.name]: e.target.value,
    });
  };

  const handleAssignedToChange = (e) => {
    setAssignedToUserId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createQuote({
      variables: {
        quoteNew: quote,
        assignedToUserId: assignedToUserId,
      },
    });
  };

  if (loading || usersLoading) return <h1>Loading</h1>;

  if (error || usersError) {
    console.log(error?.message || usersError?.message);
  }

  const availableUsers = usersData?.users || [];

  return (
    <div className="container my-container">
      {error && <div className="red card-panel">{error.message}</div>}
      {data && (
        <div className="green card-panel">
          <p>Name: {data.createQuote.name}</p>
          <p>Length: {data.createQuote.length}</p>
          <p>Width: {data.createQuote.width}</p>
          <p>Height: {data.createQuote.height}</p>
          {/* Render other fields as needed */}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <h4>Create Task!</h4>
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
        <select className='dropdown-display'  value={assignedToUserId} onChange={handleAssignedToChange}>
          <option value="">Select User</option>
          {availableUsers.map((user) => (
            <option key={user._id} value={user._id}>
              {user.firstName} {user.lastName}
            </option>
          ))}
        </select>
        <button className="btn green" type="submit">
          Add info
        </button>
      </form>
    </div>
  );
}