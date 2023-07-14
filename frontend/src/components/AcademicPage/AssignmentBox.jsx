import {React, useEffect, useState} from 'react';
import { assignmentData } from '../../data/dummy';
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddTaskPopUp from './AddTaskPopUp';

const AssignmentBox = () => {
  
  const [showAddTaskPopUp, setShowAddTaskPopUp] = useState(false);

  const handleAddTaskClick = () => {
    setShowAddTaskPopUp(true);
  };

  const handlePopUpClose = () => {
    setShowAddTaskPopUp(false);
  };

  return (
  <div className="academic-page-box-container">
    <p className='academic-page-box-header'>Assignments</p>
    <p className='academic-page-box-subheader' style={{padding: '0px 0px 40px 0px'}}>Here's a list of tasks for this semester!</p>
    <div style={{padding: '0px 0px 20px 0px'}}>
      <Button 
        sx={{
          color: 'white', 
          border: '1px solid #5A5A5A', 
          borderRadius: '10px', 
          padding: '8px 12px', 
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#333333'
          }
        }}
        onClick={handleAddTaskClick}
        >
        <AddCircleOutlineIcon />
        <p style={{fontSize:'19px'}}>{'\u00A0Add Task'}</p>
      </Button>
    </div>
    <div className="scroll-container" style={{height: '510px', width: '100%'}}>
    <div className='scroll-container-element-container'>
      <div className="scroll-container-element" style={{width: '100px', color: '#a3a3a3'}}>ID</div>
      <div className="scroll-container-element" style={{width: '350px', color: '#a3a3a3'}}>Task</div>
      <div className="scroll-container-element" style={{width: '250px', color: '#a3a3a3'}}>Deadline</div>
      <div className="scroll-container-element" style={{width: '100px', color: '#a3a3a3'}}>Complete</div>
      <div className="scroll-container-element" style={{width: '100px', color: '#a3a3a3'}}></div>
    </div>
    {assignmentData && assignmentData.map(item => (
      <div key={item.id} className="scroll-container-element-container">
      <div className="scroll-container-element" style={{width: '100px'}}>{item.id}</div>
      <div className="scroll-container-element" style={{width: '350px'}}>{item.description}</div>
      <div className="scroll-container-element" style={{width: '250px'}}>{item.dateTime}</div>
      <div className="scroll-container-element" style={{width: '100px', justifyContent: 'center'}}>{item.complete}</div>
      <div className="scroll-container-element" style={{width: '100px', justifyContent: 'center'}}>{item.complete}</div>
      </div>
    ))}
    </div>
    {showAddTaskPopUp && (
      <div className='pop-up-overlay'>
        <div className="pop-up-background" onClick={handlePopUpClose}/>
        <div className="pop-up-content">
          <AddTaskPopUp onClose={setShowAddTaskPopUp}/> 
        </div>
      </div> 
    )}
  </div>
  )
}

export default AssignmentBox