const CurrentDay = () => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDayIndex = new Date().getDay();
    const currentDay = daysOfWeek[currentDayIndex];
  
    return <p style={{
      color: 'white',
      fontSize:'30px',
      fontWeight:'500'
    }}>{currentDay}</p>;
  };

  export default CurrentDay;