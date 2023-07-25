import { React, useState, useEffect } from 'react';

const MonthSelector = ({selectedMonth, onClose, onSelect}) => {
  const handleSelectMonth = () => {
    onSelect(selectedMonth);
    onClose();
  }

  return (
    <div style={{
      height:  '70px',
      width: '65px',
      border: '1px solid #333333',
      borderRadius : '3px',
      backgroundColor: 'black',
    }}>
      <Button
        sx={{
          borderRadius : '0px',
          textTransform: 'none',
          color: 'white',
          fontSize : '12px',
          borderBottom: '1px solid #333333',
          '&:hover': {
            backgroundColor: '#333333'
          }
        }}
        onClick={handleEditClick}
      >
        Edit
      </Button>
      <Button
        sx={{
          borderRadius : '0px',
          textTransform: 'none',
          color: 'white',
          fontSize : '12px',
          borderBottom: '1px solid #333333',
          '&:hover': {
            backgroundColor: '#333333'
          }
        }}
        onClick={handleDeleteClick}
      >
        Delete
      </Button>
    </div>
  );
}