import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_QUOTE } from '../gqloperations/mutations';

function EditQuoteForm({ quoteId , quote }) {
  console.log('quoteId:', quoteId);
  console.log('quote:', quote); 
  const [editMode, setEditMode] = useState(false);
  const [quoteUpdates, setQuoteUpdates] = useState({});
  const [editQuote] = useMutation(EDIT_QUOTE, {
    variables: {
      quoteId,
      quoteUpdates,
    },
  });

  useEffect(() => {
    // Initialize quoteUpdates with existing quote data when edit mode is enabled
    if (editMode) {
      setQuoteUpdates({
       
        length: quote.length,
        width: quote.width,
        height: quote.height,
        // Include other quote fields here
      });
    }
  }, [editMode, quote]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuoteUpdates({
      ...quoteUpdates,
      [name]: value,
    });
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleUpdate = async () => {
    try {
      const { data } = await editQuote({
        variables: {
          quoteId,
          quoteUpdates,
        },
      });

      if (data.editQuote) {
        console.log('Quote updated successfully');
        setEditMode(false);
        // You can choose to implement more specific state update logic here
      } else {
        console.log('Failed to update quote');
      }
    } catch (error) {
      console.error('Error updating quote:', error);
    }
  };

  return (
    <div>
      <blockquote>
        {editMode ? (
          <div>
            <input
              type="text"
              name="length"
              placeholder="length"
              defaultValue={quoteUpdates.length || ''}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="width"
              placeholder="width"
              defaultValue={quoteUpdates.width || ''}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="height"
              placeholder="height"
              defaultValue={quoteUpdates.height || ''}
              onChange={handleInputChange}
            />
            {/* Include other input fields for other quote fields */}
            <button onClick={handleUpdate}>Update</button>
          </div>
        ) : (
          <div>
            <h6>{quote.name}</h6>
            <h6>{quote.length}</h6>
            <h6>{quote.width}</h6>
            <h6>{quote.height}</h6>
            {/* Display other quote fields */}
            <button onClick={handleEditClick}>Edit</button>
          </div>
        )}
      </blockquote>
    </div>
  );
}

export default EditQuoteForm;