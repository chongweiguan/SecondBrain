import {React, useState} from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTime from '@mui/icons-material/AccessTime';
import { Button } from "@mui/material";
import Calendar from "../Others/Calendar";
import TimePicker from "../Others/TimePicker";
import axios from "axios";


const AddExpensesPopUp = ({ onClose, user, onAdd }) => {

  const [description, setDescription] = useState('');
  const [expense, setExpense] = useState('');

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

  const handleAddExpense = () => {
    const financeData = {
      userid: user.id,
      description: description,
      amount: expense,
      date: selectedDate,
    }

    axios.post(`https://second-brain-iab6.onrender.com/api/insertfinance/`, financeData)
      .then(res => {
        console.log(res.data);
        onAdd();
      })
      .catch(err => {
        console.log(err);
        alert("Error occurred while adding the assignment")
      });
      onClose(false);
  }

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
      <p className='pop-up-header'>Add Expenses</p>
      <p className='pop-up-subheader'>Add new expenses here. Click Add when you are done.</p>
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
          <p style={{fontSize:'18px', fontWeight: '520'}}>Expense</p>
          <input
            type="text" name="" required className="inputField" style={{width: '385px', height: '35px', fontSize: '17px'}}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div style={{display: 'flex', gap: '20px', marginLeft: '34px'}}>
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
            <p style={{fontSize:'18px', fontWeight: '520'}}>Amount</p>
            <input
                type="text" name="" required className="inputField" style={{width: '80px', height: '35px', fontSize: '17px'}}
                onChange={e => setExpense(e.target.value)}
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
          onClick={handleAddExpense}
        >Add</Button>
      </div>
    </div>
  )
}

export default AddExpensesPopUp;