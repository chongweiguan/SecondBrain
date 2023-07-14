import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DigitalClock } from '@mui/x-date-pickers';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import dayjs from 'dayjs';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const TimePicker = ({ onSelect }) => {

  const [selectedTime, setSelectedTime] = useState(dayjs());

  const handleSelectTime = (selectedTime) => {
    setSelectedTime(selectedTime);
    onSelect(selectedTime.format('hh:mm A'));
  }

  return (
    <div className='pop-up-container'
      style={{
        padding: '5px'
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
          <DigitalClock value={selectedTime} onChange={(newValue) => handleSelectTime(newValue)}/>
      </ThemeProvider>
      </LocalizationProvider>
    </div>
  );
};

export default TimePicker;
