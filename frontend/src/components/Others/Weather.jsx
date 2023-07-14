import { useState, useEffect, React } from "react";

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null)
  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=singapore&APPID=b45a8a74706406ae262177584b27bfc1`
  
    useEffect(() => {
      const fetchWeatherData = async () => {
        try {
          const response = await fetch(url)
          const data = await response.json()
          setWeatherData(data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchWeatherData();
      const interval = setInterval(fetchWeatherData, 60000);
  
      return () => clearInterval(interval);
    },[])
  
    if(!weatherData) {
      return <p>Loading...</p>
    }
  
    return (
      <div style={{display: 'flex', gap: '50px'}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <p style={{color:'white', fontSize:'30px', fontWeight:'650'}}>SINGAPORE</p>
          <p style={{color:'white', fontSize:'20px'}}>WEATHER</p>
        </div>
        <p style={{fontSize:'35px', marginTop:'20px'}}>⛅</p>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <p style={{color:'white', fontSize:'30px', fontWeight:'650'}}>{(weatherData.main.temp - 273.15).toFixed(1)}°C</p>
          <p style={{color:'white', fontSize:'20px'}}>{weatherData.weather[0].main}</p>
        </div>
      </div>
    )
  }

  export default Weather