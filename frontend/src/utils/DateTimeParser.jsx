import React from 'react';

export const formatDateTime = (dateTime) => {
  const dateParts = dateTime.split('/');
  const day = dateParts[0];
  const month = dateParts[1] - 1;
  const year = dateParts[2];

  const dateObject = new Date(year, month, day);
  const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDate = dateObject.toLocaleDateString('en-US', options);

  return formattedDate;
};