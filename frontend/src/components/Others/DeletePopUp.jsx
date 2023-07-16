import {React, useState} from "react";
import { Button } from "@mui/material";

const DeletePopUp = ({onClose}) => {

  const handleCancel = () => {
    onClose(false);
  };

  return (
    <div 
      style={{
        height: '130px', 
        width: '330px',
        border: '1px solid #333333',
        borderRadius: '3px',
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px'
      }}>
        <p>Are you sure you want to delete?</p>
        <div style={{display: 'flex', gap: '20px'}}>
        <Button
            sx={{
            width: '100px',
            fontSize: '17px',
            color: 'white', 
            border: '1px solid #5A5A5A', 
            borderRadius: '10px', 
            padding: '5px 8px', 
            textTransform: 'none',
            '&:hover': {
                backgroundColor: '#333333'
            }
            }}
            onClick={handleCancel}
        >Cancel</Button>
        <Button
            sx={{
            fontWeight: '600',
            backgroundColor: '#B6B6B6',
            width: '80x',
            fontSize: '17px',
            color: 'black', 
            border: '1px solid #5A5A5A', 
            borderRadius: '10px', 
            padding: '5px 8px', 
            textTransform: 'none',
            '&:hover': {
                backgroundColor: 'white'
            }
            }}
            onClick={handleCancel}
        >Confirm</Button>
        </div>
    </div>
  )
}

export default DeletePopUp