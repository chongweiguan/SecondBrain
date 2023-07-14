import { examsData } from '../../data/dummy';
import {React, useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddExamPopUp from './AddExamPopUp';

const ExamBox = () => {

  const [showAddExamPopUp, setShowAddExamPopUp] = useState(false);

  const handleAddExamClick = () => {
    setShowAddExamPopUp(true);
  };

  const handlePopUpClose = () => {
    setShowAddExamPopUp(false);
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
      <div className="scroll-container-element" style={{width: '400px', color: '#a3a3a3'}}>Exam</div>
      <div className="scroll-container-element" style={{width: '250px', color: '#a3a3a3'}}>Date</div>
      <div className="scroll-container-element" style={{width: '100px', color: '#a3a3a3'}}>Venue</div>
    </div>
    {examsData && examsData.map(item => (
      <div key={item.id} className="scroll-container-element-container">
      <div className="scroll-container-element" style={{width: '100px'}}>{item.id}</div>
      <div className="scroll-container-element" style={{width: '400px'}}>{item.description}</div>
      <div className="scroll-container-element" style={{width: '250px'}}>{item.dateTime}</div>
      <div className="scroll-container-element" style={{width: '100px', justifyContent: 'center'}}>{item.venue}</div>
      </div>
    ))}
    {showAddExamPopUp && (
      <div className='pop-up-overlay'>
        <div className="pop-up-background" onClick={handlePopUpClose}/>
        <div className="pop-up-content">
          <AddExamPopUp onClose={setShowAddExamPopUp}/> 
        </div>
      </div> 
    )}
    </div>
  </div>
  )
}

export default ExamBox