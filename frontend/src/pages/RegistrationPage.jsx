import { React, useState, useEffect } from 'react';
import banner5 from '../assets/banner5.mp4';
import AuthBanner from '../components/Others/AuthBanner';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import google from '../assets/google-icon.png';

const RegistrationPage = () => {

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
    setIsSmallScreen(window.innerWidth <= 1230);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
    window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
  <div className="black-background" 
    style={{display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center'}}>
    {isSmallScreen ?  null : 
      <div 
      style={{
        overflow: 'hidden', 
        height: '100vh', 
        width: '25%',
        minWidth: '550px'
      }}>
      <video
        style={{ width: '100%', objectFit: 'cover', bottom: 0, transform: 'translateY(-5%)' }}
        src={banner5}
        autoPlay
        loop
        muted
      />
      </div>
    }
    <div 
    style={{
      height: '100vh', 
      width: '100vw', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center'
    }}>
    <div style={{
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center',
    }}>
      <p className='main-header'>&#123; Second Brain &#125;</p>
      <p style={{padding: '0px 0px 40px 0px', fontWeight: '500', color: '#969696'}}>He who climbs the ladder must begin at the bottom.</p>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{width: '650px'}}>
          <p style={{fontSize: '28px', fontWeight: '700'}}>Registration</p>
          <p style={{fontSize: '10px'}}>* indicates required fields</p>
          <div style={{padding: '30px 0px 0px 0px', display: 'flex', justifyContent: 'space-between'}}>
            <div>
              <p style={{fontWeight: '500', fontSize: '13px', padding: '0px 0px 5px 0px'}}>First Name *</p>
              <input
                type="text" name="" required className="inputField" style={{width: '310px', height: '35px', fontSize: '15px', borderRadius: '3px'}}
              />
            </div>
            <div>
              <p style={{fontWeight: '500', fontSize: '13px', padding: '0px 0px 5px 0px'}}>Last Name</p>
              <input
                type="text" name="" required className="inputField" style={{width: '310px', height: '35px', fontSize: '15px', borderRadius: '3px'}}
              />
            </div>
          </div>
          <div style={{padding: '15px 0px 0px 0px', display: 'flex', justifyContent: 'space-between'}}>
            <div>
              <p style={{fontWeight: '500', fontSize: '13px', padding: '0px 0px 5px 0px'}}>Email *</p>
              <input
                type="text" name="" required className="inputField" style={{width: '310px', height: '35px', fontSize: '15px', borderRadius: '3px'}}
              />
            </div>
            <div>
              <p style={{fontWeight: '500', fontSize: '13px', padding: '0px 0px 5px 0px'}}>Leetcode username</p>
              <input
                type="text" name="" required className="inputField" style={{width: '310px', height: '35px', fontSize: '15px', borderRadius: '3px'}}
              />
            </div>
          </div>
          <div style={{padding: '15px 0px 0px 0px', display: 'flex', justifyContent: 'space-between'}}>
            <div>
              <p style={{fontWeight: '500', fontSize: '13px', padding: '0px 0px 5px 0px'}}>Password *</p>
              <input
                type="password" name="" required className="inputField" style={{width: '310px', height: '35px', fontSize: '15px', borderRadius: '3px'}}
              />
            </div>
            <div>
              <p style={{fontWeight: '500', fontSize: '13px', padding: '0px 0px 5px 0px'}}>Confirm Password *</p>
              <input
                type="password" name="" required className="inputField" style={{width: '310px', height: '35px', fontSize: '15px', borderRadius: '3px'}}
              />
            </div>
          </div>
        </div>
      </div>
      <div style={{padding: '40px 0px 0px 0px'}}>
        <Button
          sx={{
            fontWeight: '600',
            backgroundColor: 'black',
            width: '650px',
            fontSize: '17px',
            color: 'white', 
            border: '1px solid #5A5A5A', 
            borderRadius: '20px', 
            padding: '5px 8px', 
            textTransform: 'none',
            '&:hover': {
                backgroundColor: 'white',
                color: 'black'
            }
          }}
        >Register</Button>
      </div>
      <div style={{padding: '15px 0px 0px 0px', display: 'flex', justifyContent: 'flex-start', width: '100%'}}>
        <p style={{fontSize: '12px'}}>{"Already have an account?\u00A0"}</p>
        <Link to='/login'>
          <p className='small-link'>Sign In</p>
        </Link>
      </div>
    </div>
    </div>
  </div>
  )
}

export default RegistrationPage;
