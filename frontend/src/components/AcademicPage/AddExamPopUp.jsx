import {React, useState} from "react";
import AccessTime from '@mui/icons-material/AccessTime';
import { Button } from "@mui/material";
import TimePicker from "../Others/TimePicker";


const AddExamPopUp = ({ onClose }) => {

  const [selectedTime, setSelectedTime] = useState("\u00A0");
  const [showTimePicker, setShowTimePicker] = useState(false);

  //Time Picker functions
  const handleShowTimePicker = () => {
    setShowTimePicker(true);
  }

  const handleCloseTimePicker = () => {
    setShowTimePicker(false);
  }

  const handleSelectTime = (time) => {
    setSelectedTime(time);
    setShowTimePicker(false);
  }

  const handleCancel = () => {
    onClose(false);
  };

  return (
    <div className='pop-up-container' style={{
      padding: '30px 30px',
      height:'350px',
      width: '550px',
      position: "absolute",
      top: "120%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    }}>
      <p className='pop-up-header' style={{fontSize:'25px'}}>Add Exam</p>
      <p className='pop-up-subheader' style={{fontSize:'16px'}}>Add new examinations here. Click Add when you are done.</p>
      <div style={{
        height: '150px', 
        display:'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        flexDirection: 'column'
      }}>
        <div 
          style={{
            display:'flex', 
            gap: '15px', 
            alignItems: 'center', 
            padding: '30px 0px 30px 0px',
          }}>
          <p style={{fontSize:'18px', fontWeight: '520'}}>{'Exam\u00A0'}</p>
          <input
            type="text" name="" required className="inputField" style={{width: '420px', height: '35px', fontSize: '17px'}}
          />
        </div>
        <div style={{display: 'flex', gap: '20px'}}>
          <div 
            style={{
              display:'flex', 
              gap: '15px', 
              alignItems: 'center', 
            }}>
            <p style={{fontSize:'18px', fontWeight: '520', fontSize: '17px'}}>Venue</p>
            <input
            type="text" name="" required className="inputField" style={{width: '190px', height: '35px'}}
          />
          </div>
          <div 
            style={{
              display:'flex', 
              gap: '15px', 
              alignItems: 'center', 
            }}>
            <p style={{fontSize:'18px', fontWeight: '520', fontSize: '17px'}}>Time</p>
            <Button 
              onClick={handleShowTimePicker}
              sx={{
                width:'147px',
                height: '35px',
                color: 'white', 
                border: '1px solid grey', 
                borderRadius: '5px', 
                padding: '5px 10px', 
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#333333'
                },
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
              {selectedTime && <p style={{fontSize: '17px'}}>{selectedTime}</p>}
              <AccessTime sx={{fontSize:'17px'}}/>
            </Button>
            {showTimePicker && (
              <div className='pop-up-overlay' onClick={handleCloseTimePicker}>
                <div
                style={{
                  position: "absolute",
                  top: "-15%",
                  left: '67%',
                  width: '150px'
                }}
                >
                  <TimePicker onSelect={handleSelectTime} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div style={{marginTop: '35px', width: '490px', display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
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
        >Add</Button>
      </div>
    </div>
  )
}

export default AddExamPopUp;