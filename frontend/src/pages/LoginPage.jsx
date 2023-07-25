import { React, useState, useEffect } from 'react';
import banner4 from '../assets/banner4.mp4';
import AuthBanner from '../components/Others/AuthBanner';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import google from '../assets/google-icon.png';
import axios from 'axios';

const LoginPage = () => {

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const [values, setValues] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = (event) => {
    event.preventDefault()  
    axios.post('https://second-brain-iab6.onrender.com/api/login', values)
    .then(res => {
      if(res.data) {
        console.log(res.data);
        console.log("Login Successful");
        navigate("/");
      } else {
        alert(res.data.Error);
      }
    })
    .then(err => console.log(err));
  }

  useEffect(() => {
    const handleResize = () => {
    setIsSmallScreen(window.innerWidth <= 1100);
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
    {isSmallScreen ?  null : <AuthBanner bannerPath={banner4}/>}
    <div 
    style={{
      height: '100vh', 
      width: '100vh', 
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
      <p style={{padding: '10px 0px 40px 0px', fontWeight: '500', color: '#969696'}}>He who climbs the ladder must begin at the bottom.</p>
      <div style={{display: 'flex', flexDirection: 'column', gap:'10px'}}>
      <p style={{fontWeight:'600', padding: '10px 0px'}}>Login Account</p>
      <input
        onChange={e => setValues({...values, email: e.target.value})}
        type="text" name="" required className="inputField" style={{width: '400px', height: '35px', fontSize: '17px'}}
        placeholder="Email Address"
      />
      <input
        onChange={e => setValues({...values, password: e.target.value})}
        name="" required className="inputField" style={{width: '400px', height: '35px', fontSize: '17px'}}
        placeholder="Password"
        type="password"
      />
      <div style={{display: 'flex', justifyContent:'end',}}>
        <Link to="/finance">
        <p className='small-link'>
          Forgot Password?
        </p>
        </Link>
      </div>
      </div>
      <div style={{padding: '30px 0px 0px 0px'}}>
      <Button
        onClick={handleSubmit}
        sx={{
        fontWeight: '600',
        backgroundColor: 'black',
        width: '190px',
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
      >Sign In</Button>
      </div>
      <div
      style={{
        padding: '40px 0px 0px 0px',
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center',
        gap: '20px'
      }}
      >
      <hr style={{width: '200px', marginTop: '2px', border: '1px solid #5C5C5C'}}/>
      <p>or</p>
      <hr style={{width: '200px', marginTop: '2px', border: '1px solid #5C5C5C'}}/>
      </div>
      <div style={{padding: '40px 0px 0px 0px', display: 'flex'}}>
      <p style={{fontSize: '12px'}}>{"Dont have an Account?\u00A0"}</p>
      <Link to='/register'>
        <p className='small-link'>Create Account</p>
      </Link>
      </div>
    </div>
    </div>
  </div>
  )
}

export default LoginPage;
