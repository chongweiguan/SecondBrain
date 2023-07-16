import {React, useState} from "react";
import { Button } from "@mui/material";

const OptionsPopUp = () => {
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
      >
        Delete
      </Button>
    </div>
  );
}

export default OptionsPopUp;