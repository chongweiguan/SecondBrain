
import { React, useState, useEffect } from 'react';
import Banner from '../components/Others/Banner';
import banner1 from '../assets/banner1.mp4';
import DaysCompleted from '../components/Others/DaysCompleted';
import FinanceBox from '../components/HomePage/FinanceBox';
import AcademicBox from '../components/HomePage/AcademicsBox';
import JobBox from '../components/HomePage/JobBox';
import Time from '../components/Others/Time';
import Weather from '../components/Others/Weather';
import CurrentDay from '../components/Others/CurrentDay';
import NavBar from '../components/Others/NavBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../App.css"

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const auth = () => {
    axios.get(`http://localhost:3001/api/login`)
      .then(res => {
        if(res.data.loggedIn) {
          setUser(res.data.user);
        } else {
          navigate("/login")
        }
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    auth();
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1350);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogout = () => {
    axios.get('http://localhost:3001/api/logout')
    .then(res => {
      location.reload(true);
    }).catch(err => console.log(err));
  }

  if(!user) {
    return null;
  }

  return (
    <div className="black-background">
      <Banner bannerPath={banner1} logo={'👾'} />
      <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', flexDirection: isSmallScreen ? 'column' : 'row'}}>
        <div>
          <h1 className="page-header">
            &#123; Simple Second Brain &#125;
          </h1>
          <h1 className="page-subHeader">
            ⚓ &nbsp;&nbsp;Welcome, {user.firstname} !
          </h1>
        </div>
        <NavBar logout={handleLogout}/>
      </div>
        <hr className="line-break" />
        <div 
          width='500px'
          style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center', 
          padding: '0 70px', 
          flexDirection: isSmallScreen ? 'column' : 'row',
          maxWidth: '2000px',
          margin: '0 auto', 
        }}>
          <div>
            <DaysCompleted />
          </div>
          <div style={{marginTop: isSmallScreen ? '30px' : '0px'}}>
           <Weather />
          </div>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            marginTop: isSmallScreen ? '30px' : '0px' 
          }}>
            <Time />
            <CurrentDay />
          </div>
        </div>
      <hr className="line-break"/>
      <div style={{
        padding: '30px', 
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        flexDirection: isSmallScreen ? 'column' : 'row'
      }}>
        <FinanceBox user={user}/>
        <AcademicBox user={user}/>
        <JobBox user={user}/>
      </div>
      <hr className="line-break"/>
    </div>
  )
}

export default HomePage