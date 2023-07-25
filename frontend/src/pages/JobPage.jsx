import { React, useState, useEffect } from 'react';
import Banner from '../components/Others/Banner'
import banner3 from '../assets/banner3.mp4'
import LeetCodeBox from '../components/JobPage/LeetCodeBox'
import JobBox from '../components/JobPage/JobBox'
import NavBar from '../components/Others/NavBar'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const JobPage = () => {
  
  const [user, setUser] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const auth = () => {
    axios.get('https://second-brain-iab6.onrender.com/api/login', { withCredentials: true })
      .then(res => {
        console.log(res);
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
    axios.get('https://second-brain-iab6.onrender.com/api/logout')
    .then(res => {
      location.reload(true);
      navigate("/login")
    }).catch(err => console.log(err));
  }
  
  return (
    <div className="black-background">
      <Banner bannerPath={banner3} logo={'🚀'} />
      <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', flexDirection: isSmallScreen ? 'column' : 'row'}}>
        <div>
          <h1 className="page-header">
            &#123; Expenses & Finances &#125;
          </h1>
          <h1 className="page-subHeader">
            💰 &nbsp;&nbsp;Money, Money, Money
          </h1>
        </div>
        <NavBar logout={handleLogout}/>
      </div>
        <hr className="line-break" />
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center' , gap: '50px'}}>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0px 0px 30px 0px'}}>
          <LeetCodeBox user={user}/>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '300px', width: '500px'}}>
            <p style={{fontSize: '30px', fontStyle: 'italic'}}>"He who climbs the ladder must</p>
            <p style={{fontSize: '30px', fontStyle: 'italic'}}>begin at the bottom"</p>
          </div>
        </div>
        <div>
          <div style={{padding: '50px', display: 'flex', justifyContent: 'center'}}>
            <JobBox user={user}/>
          </div>
        </div>
    </div>
  )
}

export default JobPage