import {React, useState} from "react";
import { Button } from "@mui/material";
import Calendar from "../Others/Calendar";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const EditJobPopUp = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState("\u00A0");
  const [showDatePicker, setShowDatePicker] = useState(false);

  //Date Picker functions
  const handleShowDatePicker = () => {
    setShowDatePicker(true);
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  }

  const handleCloseDatePicker = () => {
    setShowDatePicker(false);
  }

  const handleCancel = () => {
    onClose(false);
  };

  return (
    <div className='pop-up-container' style={{
      padding: '30px 30px',
      height:'490px',
      width: '550px',
      position: "absolute",
      top: "120%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    }}>
      <p className='pop-up-header'>Edit Internship</p>
      <p className='pop-up-subheader'>Edit internships here. Click Confirm when you are done.</p>
      <div style={{
        height: '300px', 
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
          }}>
          <p style={{fontSize:'18px', fontWeight: '520'}}>Company</p>
          <input
            type="text" name="" required className="inputField" style={{width: '380px', height: '35px', fontSize: '17px'}}
          />
        </div>
        <div 
          style={{
            display:'flex', 
            gap: '25px', 
            alignItems: 'center', 
            padding: '20px 0px 0px 0px'
          }}>
          <p style={{fontSize:'18px', fontWeight: '520'}}>Position</p>
          <input
            type="text" name="" required className="inputField" style={{width: '380px', height: '35px', fontSize: '17px'}}
          />
        </div>
        <div style={{display: 'flex', gap: '20px', padding: '20px 0px 20px 0px'}}>
          <div 
            style={{
              display:'flex', 
              gap: '20px', 
              alignItems: 'center', 
              width: '480px'
            }}>
            <p style={{fontSize:'18px', fontWeight: '520'}}>Deadline</p>
            <Button
              onClick={handleShowDatePicker}
              sx={{
                width:'195px',
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
            }}>{selectedDate && <p style={{fontSize: '17px'}}>{selectedDate}</p>}
              <CalendarMonthIcon sx={{fontSize:'17px'}}/>
            </Button>
            {showDatePicker && (
              <div className='pop-up-overlay' onClick={handleCloseDatePicker}>
                <div
                style={{
                  position: "absolute",
                  top: "-28%",
                  left: '14%'
                }}
                >
                  <Calendar onSelect={handleSelectDate} date={selectedDate} />
                </div>
              </div>
            )}
          </div>
        </div>
        <div 
            style={{
                display:'flex', 
                gap: '40px', 
                alignItems: 'center',
                width: '480px',
            }}>
            <p style={{fontSize:'18px', fontWeight: '520'}}>Status</p>
            <input
              type="text" name="" required className="inputField" style={{width: '440px', height: '35px', fontSize: '17px'}}
            />
            </div>
            <div 
            style={{
                display:'flex', 
                gap: '18px', 
                alignItems: 'center',
                width: '480px',
                padding: '20px 0px 0px 0px',
            }}>
            <p style={{fontSize:'18px', fontWeight: '520'}}>Remarks</p>
            <input
              type="text" name="" required className="inputField" style={{width: '440px', height: '35px', fontSize: '17px'}}
            />
            </div>
      </div>
      <div style={{marginTop: '15px', width: '485px', display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
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

export default EditJobPopUp