import { React, useState, useEffect } from 'react';
import WorkIcon from '@mui/icons-material/Work';
import HomeIcon from '@mui/icons-material/Home';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BookIcon from '@mui/icons-material/Book';
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';

const NavBar = ({logout}) => {

  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/');
  }

  const handleNavigateFinance = () => {
    navigate('/finance');
  }

  const handleNavigateAcademics = () => {
    navigate('/academics');
  }

  const handleNavigateJobs = () => {
    navigate('/jobs');
  }

  const handleLogout = () => {
    logout();
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '50px 70px 0px 0px', gap: '10px'}}>
        <Button
          onClick={handleNavigateHome}
        >
          <HomeIcon style={{color: 'white', fontSize: '40px'}}/>
        </Button>
        <Button
          onClick={handleNavigateFinance}
        >
          <AttachMoneyIcon style={{color: 'white', fontSize: '40px'}}/>
        </Button>
        <Button
          onClick={handleNavigateAcademics}
        >
          <BookIcon style={{color: 'white', fontSize: '40px'}}/>
        </Button>
        <Button
          onClick={handleNavigateJobs}
        >
          <WorkIcon style={{color: 'white', fontSize: '40px'}}/>
        </Button>
        <div style={{padding: '0px 0px 0px 10px', }}>
          <Button
            onClick={handleLogout}
            sx={{
            fontWeight: '600',
            width: '80x',
            fontSize: '17px',
            color: 'white', 
            border: '1px solid #5A5A5A', 
            borderRadius: '10px',
            textTransform: 'none',
            '&:hover': {
                backgroundColor: '#333333'
            }
            }}
          >Logout</Button>
        </div>
    </div>
  )
}

export default NavBar;