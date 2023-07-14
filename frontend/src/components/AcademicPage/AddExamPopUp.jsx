import {React, useState} from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTime from '@mui/icons-material/AccessTime';
import { Button } from "@mui/material";
import Calendar from "../Others/Calendar";
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
      padding: '50px 50px',
      height:'470px',
      width: '750px',
      position: "absolute",
      top: "120%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    }}>
      <p className='pop-up-header'>Add Exam</p>
      <p className='pop-up-subheader'>Add new examinations here. Click Add when you are done.</p>
      <div style={{
        height: '200px', 
        display:'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        flexDirection: 'column'
      }}>
        <div 
          style={{
            display:'flex', 
            gap: '20px', 
            alignItems: 'center', 
            padding: '30px 0px 30px 0px',
          }}>
          <p style={{fontSize:'22px', fontWeight: '520'}}>Exam</p>
          <input
            type="text" name="" required className="inputField" style={{width: '550px', height: '55px'}}
          />
        </div>
        <div style={{display: 'flex', gap: '30px'}}>
          <div 
            style={{
              display:'flex', 
              gap: '20px', 
              alignItems: 'center', 
            }}>
            <p style={{fontSize:'22px', fontWeight: '520'}}>Venue</p>
            <input
            type="text" name="" required className="inputField" style={{width: '250px', height: '45px'}}
          />
          </div>
          <div 
            style={{
              display:'flex', 
              gap: '20px', 
              alignItems: 'center', 
            }}>
            <p style={{fontSize:'22px', fontWeight: '520'}}>Time</p>
            <Button 
              onClick={handleShowTimePicker}
              sx={{
                width:'200px',
                height: '45px',
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
              <AccessTime />
            </Button>
            {showTimePicker && (
              <div className='pop-up-overlay' onClick={handleCloseTimePicker}>
                <div
                style={{
                  position: "absolute",
                  top: "9%",
                  left: '63%',
                  width: '170px'
                }}
                >
                  <TimePicker onSelect={handleSelectTime} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div style={{marginTop: '20px', width: '640px', display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
        <Button
          sx={{
            width: '120px',
            fontSize: '25px',
            color: 'white', 
            border: '1px solid #5A5A5A', 
            borderRadius: '10px', 
            padding: '8px 12px', 
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
            width: '100px',
            fontSize: '25px',
            color: 'black', 
            border: '1px solid #5A5A5A', 
            borderRadius: '10px', 
            padding: '8px 12px', 
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