// useDjangoErrors.js
import { useState } from 'react';

const useDjangoErrors = () => {
  const [errors, setErrors] = useState({});

  const fetchErrors = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const errorData = await response.json();

      if (!response.ok) {
        setErrors(errorData);
        return errorData;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return { errors, fetchErrors };
};

export default useDjangoErrors;