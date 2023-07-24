import { React, useState, useEffect } from 'react';
import Banner from '../components/Others/Banner'
import banner3 from '../assets/banner3.mp4';
import AssignmentBox from '../components/AcademicPage/AssignmentBox';
import ExamBox from '../components/AcademicPage/ExamBox';
import ModuleBox from '../components/AcademicPage/ModuleBox';
import ModuleProgress from '../components/AcademicPage/ModuleProgress';
import NavBar from '../components/Others/NavBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AcademicPage = () => {

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const auth = () => {
    axios.get('http://localhost:3001/api/login')
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
      <Banner bannerPath={banner3} logo={'📔'} />
      <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', flexDirection: isSmallScreen ? 'column' : 'row'}}>
        <div>
          <h1 className="page-header">
            &#123; Education & Academics &#125;
          </h1>
          <h1 className="page-subHeader">
            📖 &nbsp;&nbsp;Just keep going!
          </h1>
        </div>
        <NavBar logout={handleLogout}/>
      </div>
        <hr className="line-break" />
        <div style={{ textAlign: 'center' }}>
          <p style={{
              fontSize: '40px',
              fontWeight: '700',
              padding: '5px'
            }}>
              AY2023/2024, Semester 1, Week 2
          </p>
          <p style={{
              fontSize: '22px',
            }}>
              Modules: CS2102 CS2105
          </p>
        </div>
        <div style={{padding: '50px 10px 60px 10px', display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row', justifyContent: 'center', alignItems: 'center', gap: '20px'}}>
          <AssignmentBox user={user}/>
          <ExamBox user={user}/>
        </div>
        <div style={{padding: '0px 10px 80px 10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexDirection: isSmallScreen ? 'column' : 'row'}}>
          <ModuleBox user={user}/>
        </div>
    </div>
  )
}

export default AcademicPage