import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import dayjs from 'dayjs';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Calendar = ({ onSelect }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleSelectDate = (selectDate) => {
    setSelectedDate(selectDate);
    onSelect(selectDate.format('ddd, DD MMM YYYY'));
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
          <DateCalendar value={selectedDate} onChange={(newValue) => handleSelectDate(newValue)}
            sx={{
              "& .MuiPickersDay-dayWithMargin:not(.Mui-selected)": {
                backgroundColor: "transparent",
              },
              "& .Mui-selected": {
                backgroundColor: "#FFFFFF",
              },
              "& .MuiTabs-root": {
                backgroundColor: "rgba(120, 120, 120, 0.4)",
              },
            }}
          />
      </ThemeProvider>
      </LocalizationProvider>
    </div>
  );
};

export default Calendar;
