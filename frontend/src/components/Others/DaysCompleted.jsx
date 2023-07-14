import React from 'react';

const DaysCompleted = () => {
  const currentDate = new Date();

  const startOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay());
  const endOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + 6);
  const totalWeekDays = 7;
  const weekDaysCompleted = Math.floor((currentDate - startOfWeek) / 86400000) + 1; // 1 day in milliseconds = 86400000

  const totalMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const monthDaysCompleted = currentDate.getDate();

  const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
  const endOfYear = new Date(currentDate.getFullYear(), 11, 31);
  const totalYearDays = Math.floor((endOfYear - startOfYear) / 86400000) + 1;
  const yearDaysCompleted = Math.floor((currentDate - startOfYear) / 86400000) + 1;

  const calculatePercentage = (completed, total) => {
    return (completed / total) * 100;
  };

  return (
    <div>
      <div style={{ display: 'flex', padding: '5px 0px' }}>
        <div className="progress-bar-border" style={{ width: '300px' }}>
          <div
            className="progress-bar"
            style={{ width: `${calculatePercentage(weekDaysCompleted, totalWeekDays)}%`, backgroundColor: 'white' }}
          />
        </div>
        <p style={{ color: 'white', padding: '0px 10px' }}>
          Week: {weekDaysCompleted} / {totalWeekDays}
        </p>
      </div>
      <div style={{ display: 'flex', padding: '5px 0px' }}>
        <div className="progress-bar-border" style={{ width: '300px' }}>
          <div
            className="progress-bar"
            style={{ width: `${calculatePercentage(monthDaysCompleted, totalMonthDays)}%`, backgroundColor: 'white' }}
          />
        </div>
        <p style={{ color: 'white', padding: '0px 10px' }}>
          Month: {monthDaysCompleted} / {totalMonthDays}
        </p>
      </div>
      <div style={{ display: 'flex', padding: '5px 0px' }}>
        <div className="progress-bar-border" style={{ width: '300px' }}>
          <div
            className="progress-bar"
            style={{ width: `${calculatePercentage(yearDaysCompleted, totalYearDays)}%`, backgroundColor: 'white' }}
          />
        </div>
        <p style={{ color: 'white', padding: '0px 10px' }}>
          Year: {yearDaysCompleted} / {totalYearDays}
        </p>
      </div>
    </div>
  );
};

export default DaysCompleted;
