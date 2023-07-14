import { useState, useEffect, React } from "react";

const Time = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Singapore' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Singapore' }));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <p style={{
        color: 'white',
        fontSize:'60px',
        fontWeight:'500'
      }}>{time}</p>
    </div>
  )
}

export default Time