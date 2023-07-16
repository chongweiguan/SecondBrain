import {React, useState} from "react";
import AccessTime from '@mui/icons-material/AccessTime';
import { Button } from "@mui/material";
import TimePicker from "../Others/TimePicker";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Calendar from "../Others/Calendar";


const EditExamPopUp = ({ onClose }) => {

  const [selectedTime, setSelectedTime] = useState("\u00A0");
  const [showTimePicker, setShowTimePicker] = useState(false);

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
      height:'400px',
      width: '550px',
      position: "absolute",
      top: "120%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    }}>
      <p className='pop-up-header' style={{fontSize:'25px'}}>Edit Exam</p>
      <p className='pop-up-subheader' style={{fontSize:'16px'}}>Edit examinations here. Click Confirm when you are done.</p>
      <div style={{
        height: '190px', 
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
            padding: '30px 0px 25px 0px',
          }}>
          <p style={{fontSize:'18px', fontWeight: '520'}}>{'Exam\u00A0'}</p>
          <input
            type="text" name="" required className="inputField" style={{width: '420px', height: '35px', fontSize: '17px'}}
          />
        </div>
        <div style={{display: 'flex', gap: '20px', padding: '0px 0px 25px 0px'}}>
          <div 
            style={{
              display:'flex', 
              gap: '25px', 
              alignItems: 'center', 
            }}>
            <p style={{fontSize:'18px', fontWeight: '520'}}>Date</p>
            <Button
              onClick={handleShowDatePicker}
              sx={{
                width:'180px',
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
                  top: "-45%",
                  left: '2%'
                }}
                >
                  <Calendar onSelect={handleSelectDate} date={selectedDate} />
                </div>
              </div>
            )}
          </div>
          <div 
            style={{
              display:'flex', 
              gap: '15px', 
              alignItems: 'center', 
            }}>
            <p style={{fontSize:'18px', fontWeight: '520'}}>Time</p>
            <Button 
              onClick={handleShowTimePicker}
              sx={{
                width:'155px',
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
              <AccessTime />
            </Button>
            {showTimePicker && (
              <div className='pop-up-overlay' onClick={handleCloseTimePicker}>
                <div
                style={{
                  position: "absolute",
                  top: "-16%",
                  left: '66%',
                  width: '160px'
                }}
                >
                  <TimePicker onSelect={handleSelectTime} />
                </div>
              </div>
            )}
          </div>
        </div>
        <div style={{display: 'flex'}}>
          <div 
            style={{
              display:'flex', 
              gap: '18px', 
              alignItems: 'center',
              width: '490px' 
            }}>
            <p style={{fontSize:'18px', fontWeight: '520', fontSize: '17px'}}>Venue</p>
            <input
            type="text" name="" required className="inputField" style={{width: '250px', height: '35px', borderRadius: '5px'}}
          />
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
        >Confirm</Button>
      </div>
    </div>
  )
}

export default EditExamPopUp;