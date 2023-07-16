import {React, useEffect, useState} from 'react';
import { moduleData } from '../../data/dummy';
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddModulePopUp from './AddModulePopUp';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import OptionsPopUp from '../Others/OptionsPopUp';

const ModuleBox = () => {

    const [showOptionsPopUp, setShowOptionsPopUp] = useState(false);
    const [popUpPosition, setPopUpPosition] = useState({ x: 0, y: 0 });

    const [showAddModulePopUp, setShowAddModulePopUp] = useState(false);

    const handleShowOptionsPopUp = (event) => {
      const x = event.clientX - 10;
      const y = event.clientY + 10;
      setPopUpPosition({ x, y });
      setShowOptionsPopUp(true);
      document.body.style.overflow = 'hidden'; // Disable scrolling
    }
  
    const handleDontShowOptionsPopUp = () => {
      setShowOptionsPopUp(false);
      document.body.style.overflow = 'auto'; // Enable scrolling
    }

    const handleAddModuleClick = () => {
      setShowAddModulePopUp(true);
      document.body.style.overflow = 'hidden';
    };
  
    const handlePopUpClose = () => {
      setShowAddModulePopUp(false);
      document.body.style.overflow = 'auto';
    };
  
    return (
    <div className="academic-page-box-container" style={{width: '750px'}}>
      <p className='academic-page-box-header'>Modules</p>
      <p className='academic-page-box-subheader' style={{padding: '0px 0px 30px 0px'}}>Here's a list of Modules taken!</p>
      <div style={{padding: '0px 0px 20px 0px'}}>
        <Button 
          sx={{
            color: 'white', 
            border: '1px solid #5A5A5A', 
            borderRadius: '5px', 
            padding: '5px 8px', 
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#333333'
            }
          }}
          onClick={handleAddModuleClick}
          >
          <AddCircleOutlineIcon sx={{fontSize: '15px'}}/>
          <p style={{fontSize:'15px'}}>{'\u00A0Add Module'}</p>
        </Button>
      </div>
      <div className="scroll-container" style={{height: '400px', width: '100%'}}>
      <div className='scroll-container-element-container'>
        <div className="scroll-container-element" style={{width: '60px', color: '#a3a3a3'}}>ID</div>
        <div className="scroll-container-element" style={{width: '120px', color: '#a3a3a3'}}>Module Code</div>
        <div className="scroll-container-element" style={{width: '280px', color: '#a3a3a3'}}>Module Description</div>
        <div className="scroll-container-element" style={{width: '170px', color: '#a3a3a3',justifyContent: 'center'}}>Type</div>
        <div className="scroll-container-element" style={{width: '60px', color: '#a3a3a3', justifyContent: 'center'}}>MC</div>
        <div className="scroll-container-element" style={{width: '50px', color: '#a3a3a3'}}></div>
      </div>
      {moduleData && moduleData.map(item => (
        <div key={item.id} className="scroll-container-element-container">
        <div className="scroll-container-element" style={{width: '60px'}}>{item.id}</div>
        <div className="scroll-container-element" style={{width: '120px'}}>{item.moduleCode}</div>
        <div className="scroll-container-element" style={{width: '280px'}}>{item.moduleDesc}</div>
        <div className="scroll-container-element" style={{width: '170px', justifyContent: 'center'}}>{item.type}</div>
        <div className="scroll-container-element" style={{width: '60px', justifyContent: 'center'}}>{item.mc}</div>
        <div className="scroll-container-element" style={{width: '50px', justifyContent: 'center'}}>
        <Button
          sx={{
            height: '20px',
            borderRadius: '10px',
            '&:hover': {
              backgroundColor: '#333333'
            }
          }}
          onClick={(event) => handleShowOptionsPopUp(event)}
        >
          <MoreHorizIcon 
            sx={{
              color: 'white',
            }}
          />
        </Button>
        </div>
        </div>
      ))}
      </div>
      {showOptionsPopUp && (
        <div className='pop-up-overlay' onClick={handleDontShowOptionsPopUp}>
          <div style={{ position: 'absolute', top: popUpPosition.y, left: popUpPosition.x }}>
            <OptionsPopUp />
          </div>
        </div>
      )}
      {showAddModulePopUp && (
        <div className='pop-up-overlay'>
          <div className="pop-up-background" onClick={handlePopUpClose}/>
          <div className="pop-up-content">
            <AddModulePopUp onClose={setShowAddModulePopUp}/> 
          </div>
        </div> 
      )}
    </div>
    )
}

export default ModuleBox