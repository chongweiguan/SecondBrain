import {React, useState} from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTime from '@mui/icons-material/AccessTime';
import { Button } from "@mui/material";
import Calendar from "../Others/Calendar";
import TimePicker from "../Others/TimePicker";
import axios from 'axios';

const EditTaskPopUp = ({ onClose, item, onEdit }) => {

  const [selectedDate, setSelectedDate] = useState(item.date);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [selectedTime, setSelectedTime] = useState(item.time);

  const [selectedTask, setTask] = useState(item.description);

  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleUpdateTask = () => {
    const id = item.id;
    const assignmentData = {
      description: selectedTask,
      date: selectedDate,
      time: selectedTime,
    }

    axios.put(`https://second-brain-iab6.onrender.com/api/updateassignments/?id=${id}`, assignmentData)
      .then(res => {
        console.log(res.data);
        onEdit();
      })
      .catch(err => {
        console.log(err);
        alert("Error occurred while updating the assignment")
      });
      onClose(false);
  }

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
      height:'350px',
      width: '550px',
      position: "absolute",
      top: "120%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    }}>
      <p className='pop-up-header'>Edit Task</p>
      <p className='pop-up-subheader'>Edit tasks here. Click Confirm when you are done.</p>
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
            padding: '30px 0px 30px 0px'
          }}>
          <p style={{fontSize:'18px', fontWeight: '520'}}>Task</p>
          <input
            value={selectedTask}
            type="text" name="" required className="inputField" style={{width: '435px', height: '35px', fontSize: '17px'}}
            onChange={e => setTask(e.target.value)}
          />
        </div>
        <div style={{display: 'flex', gap: '20px'}}>
          <div 
            style={{
              display:'flex', 
              gap: '15px', 
              alignItems: 'center', 
            }}>
            <p style={{fontSize:'18px', fontWeight: '520'}}>Date</p>
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
              <div className='pop-up-overlay'>
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
          onClick={handleUpdateTask}
        >Confirm</Button>
      </div>
    </div>
  )
}

export default EditTaskPopUp;