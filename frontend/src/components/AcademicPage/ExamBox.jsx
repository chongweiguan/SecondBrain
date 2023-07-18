import { examsData } from '../../data/dummy';
import {React, useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddExamPopUp from './AddExamPopUp';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import OptionsPopUp from '../Others/OptionsPopUp';
import EditExamPopUp from './EditExamPopUp';
import DeletePopUp from '../Others/DeletePopUp';

const ExamBox = () => {

  const [showOptionsPopUp, setShowOptionsPopUp] = useState(false);
  const [popUpPosition, setPopUpPosition] = useState({ x: 0, y: 0 });

  const [showAddExamPopUp, setShowAddExamPopUp] = useState(false);

  const [showEditExamPopUp, setShowEditExamPopUp] = useState(false);

  const [showDeleteExamPopUp, setShowDeleteExamPopUp] = useState(false);

  //options pop up functions
  const handleShowOptionsPopUp = (event) => {
    const x = event.clientX - 10;
    const y = event.clientY + 10;
    setPopUpPosition({ x, y });
    setShowOptionsPopUp(true);
    document.body.style.overflow = 'hidden'; // Disable scrolling
  }

  //delete exam function
  const handleDeleteExamClick = () => {
    document.body.style.overflow = 'hidden';
    setShowDeleteExamPopUp(true);
    setShowOptionsPopUp(false);
  }

  //edit exam function
  const handleEditExamClick = () => {
    document.body.style.overflow = 'auto';
    setShowEditExamPopUp(true);
    setShowOptionsPopUp(false);
  }

  const handleDontShowOptionsPopUp = () => {
    setShowOptionsPopUp(false);
    document.body.style.overflow = 'auto'; // Enable scrolling
  }

  const handleAddExamClick = () => {
    setShowAddExamPopUp(true);
    document.body.style.overflow = 'auto'; // Disable scrolling
  };

  const handlePopUpClose = () => {
    setShowAddExamPopUp(false);
    setShowEditExamPopUp(false);
    setShowOptionsPopUp(false);
    showDeleteExamPopUp(false);
    document.body.style.overflow = 'auto'; // Enable scrolling
  };

  return (
  <div className="academic-page-box-container">
    <p className='academic-page-box-header'>Examinations</p>
    <p className='academic-page-box-subheader' style={{padding: '0px 0px 30px 0px'}}>Here's a list of exams for this semester!</p>
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
        onClick={handleAddExamClick}
        >
        <AddCircleOutlineIcon sx={{fontSize: '15px'}}/>
        <p style={{fontSize:'15px'}}>{'\u00A0Add Exam'}</p>
      </Button>
    </div>
    <div className="scroll-container" style={{height: '400px', width: '100%'}}>
    <div className='scroll-container-element-container'>
      <div className="scroll-container-element" style={{width: '100px', color: '#a3a3a3'}}>ID</div>
      <div className="scroll-container-element" style={{width: '300px', color: '#a3a3a3'}}>Exam</div>
      <div className="scroll-container-element" style={{width: '250px', color: '#a3a3a3'}}>Date</div>
      <div className="scroll-container-element" style={{width: '100px', color: '#a3a3a3'}}>Venue</div>
      <div className="scroll-container-element" style={{width: '50px', color: '#a3a3a3'}}></div>
    </div>
    {examsData && examsData.map(item => (
      <div key={item.id} className="scroll-container-element-container">
      <div className="scroll-container-element" style={{width: '100px'}}>{item.id}</div>
      <div className="scroll-container-element" style={{width: '300px'}}>{item.description}</div>
      <div className="scroll-container-element" style={{width: '250px'}}>{item.dateTime}</div>
      <div className="scroll-container-element" style={{width: '100px', justifyContent: 'center'}}>{item.venue}</div>
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
    {showOptionsPopUp && (
      <div className='pop-up-overlay' onClick={handleDontShowOptionsPopUp}>
        <div style={{ position: 'absolute', top: popUpPosition.y, left: popUpPosition.x }}>
          <OptionsPopUp onEditClick={handleEditExamClick} onDeleteClick={handleDeleteExamClick}/>
        </div>
      </div>
    )}
    {showAddExamPopUp && (
      <div className='pop-up-overlay'>
        <div className="pop-up-background" onClick={handlePopUpClose}/>
        <div className="pop-up-content">
          <AddExamPopUp onClose={setShowAddExamPopUp}/> 
        </div>
      </div> 
    )}
    {showEditExamPopUp && (
      <div className="pop-up-overlay">
        <div className="pop-up-background" onClick={handlePopUpClose} />
        <div className="pop-up-content">
          <EditExamPopUp onClose={setShowEditExamPopUp} />
        </div>
      </div>
    )}
    {showDeleteExamPopUp && (
      <div className="pop-up-overlay">
        <div className="pop-up-background" onClick={handlePopUpClose} />
        <div className="pop-up-content">
          <DeletePopUp onClose={setShowDeleteExamPopUp} />
        </div>
      </div>
    )}
    </div>
  </div>
  )
}

export default ExamBox