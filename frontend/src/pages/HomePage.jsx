
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
import "../App.css"

const HomePage = () => {

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1500);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="black-background">
      <Banner bannerPath={banner1} logo={'👾'} />
      <h1 className="page-header">
          &#123; Simple Second Brain &#125;
        </h1>
      <h1 className="page-subHeader">
          ⚓ &nbsp;&nbsp;Welcome, Wei Guan !
        </h1>
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
            <DaysCompleted/>
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
        padding: '50px', 
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        flexDirection: isSmallScreen ? 'column' : 'row'
      }}>
        <FinanceBox />
        <AcademicBox />
        <JobBox />
      </div>
      <hr className="line-break"/>
    </div>
  )
}

export default HomePage