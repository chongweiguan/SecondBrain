import {React, useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import OptionsPopUp from '../Others/OptionsPopUp';
import DeletePopUp from '../Others/DeletePopUp';
import AddJobPopUp from './AddJobPopUp';
import EditJobPopUp from './EditJobPopUp';
import axios from 'axios';

const JobBox = ({user}) => {
  const [jobData, setJobData] = useState(null)

  const [showOptionsPopUp, setShowOptionsPopUp] = useState(false);
  const [popUpPosition, setPopUpPosition] = useState({ x: 0, y: 0 });

  const [showAddJobPopUp, setShowAddJobPopUp] = useState(false);
  const [showEditJobPopUp, setShowEditJobPopUp] = useState(false);
  const [showDeleteJobPopUp, setShowDeleteJobPopUp] = useState(false);
  
  const [selectedItem, setSelectedItem] = useState(null);

  const getJobData = async () => {
    try {
      axios.get(`https://second-brain-iab6.onrender.com/api/getjobs/${user.id}`)
        .then(res => {
          setJobData(res.data);
        })
    } catch (err) {
      console.error(err);
      alert("Error occurred fetching assignment Data")
    }
  }

  useEffect(() => {
    if (user && user.id) {
      getJobData();
    }
  }, [user]);

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

  const handleDeleteJobClick = () => {
    document.body.style.overflow = 'hidden';
    setShowDeleteJobPopUp(true);
    setShowOptionsPopUp(false);
  }

  const handleEditJobClick = () => {
    document.body.style.overflow = 'hidden';
    setShowEditJobPopUp(true);
    setShowOptionsPopUp(false);
  }

  const handleAddJobClick = () => {
    setShowAddJobPopUp(true);
    document.body.style.overflow = 'auto';
  };

  const handlePopUpClose = () => {
    setShowAddJobPopUp(false);
    setShowEditJobPopUp(false);
    setShowOptionsPopUp(false);
    setShowDeleteJobPopUp(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className='job-box-container'>
      <p className='academic-page-box-header'>Internship Applications</p>
      <p className='academic-page-box-subheader' style={{padding: '0px 0px 30px 0px'}}>Here are the list of internships that you have applied for. All the best!</p>
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
          onClick={handleAddJobClick}
          >
          <AddCircleOutlineIcon sx={{fontSize: '15px'}}/>
          <p style={{fontSize:'15px'}}>{'\u00A0Add Internship'}</p>
        </Button>
      </div>
      <div className="scroll-container" style={{height: '480px', width: '100%'}}>
      <div className='scroll-container-element-container'>
        <div className="scroll-container-element" style={{width: '60px', color: '#a3a3a3'}}>ID</div>
        <div className="scroll-container-element" style={{width: '200px', color: '#a3a3a3'}}>Company</div>
        <div className="scroll-container-element" style={{width: '280px', color: '#a3a3a3'}}>Position</div>
        <div className="scroll-container-element" style={{width: '170px', color: '#a3a3a3'}}>Status</div>
        <div className="scroll-container-element" style={{width: '150px', color: '#a3a3a3'}}>Next Deadline</div>
        <div className="scroll-container-element" style={{width: '200px', color: '#a3a3a3'}}>Remarks</div>
        <div className="scroll-container-element" style={{width: '80px', color: '#a3a3a3'}}></div>
      </div>
      {jobData && jobData.slice().reverse().map((item, idx) => (
        <div key={item.id} className="scroll-container-element-container">
        <div className="scroll-container-element" style={{width: '60px'}}>{idx+1}</div>
        <div className="scroll-container-element" style={{width: '200px'}}>{item.company}</div>
        <div className="scroll-container-element" style={{width: '280px'}}>{item.position}</div>
        <div className="scroll-container-element" style={{width: '170px'}}>{item.status}</div>
        <div className="scroll-container-element" style={{width: '150px'}}>{item.next_deadline}</div>
        <div className="scroll-container-element" style={{width: '200px'}}>{item.remarks}</div>
        <div className="scroll-container-element" style={{width: '80px', justifyContent: 'center'}}>
        <Button
          sx={{
            height: '20px',
            borderRadius: '10px',
            padding: '10px',
            '&:hover': {
              backgroundColor: '#333333'
            }
          }}
          onClick={(event) => {
            handleShowOptionsPopUp(event)
            setSelectedItem(item)
          }}
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
      {showAddJobPopUp && (
        <div className='pop-up-overlay'>
          <div className="pop-up-background" onClick={handlePopUpClose}/>
          <div className="pop-up-content">
            <AddJobPopUp onClose={setShowAddJobPopUp} user={user} onAdd={getJobData}/> 
          </div>
        </div> 
      )}
      {showOptionsPopUp && (
        <div className='pop-up-overlay' onClick={handleDontShowOptionsPopUp}>
          <div style={{ position: 'absolute', top: popUpPosition.y, left: popUpPosition.x }}>
            <OptionsPopUp onEditClick={handleEditJobClick} onDeleteClick={handleDeleteJobClick}/>
          </div>
        </div>
      )}
      {showDeleteJobPopUp && (
      <div className="pop-up-overlay">
        <div className="pop-up-background" onClick={handlePopUpClose} />
        <div className="pop-up-content">
          <DeletePopUp onClose={setShowDeleteJobPopUp} item={selectedItem} onDelete={getJobData} type='jobs'/>
        </div>
      </div>
    )}
    {showEditJobPopUp && (
      <div className="pop-up-overlay">
        <div className="pop-up-background" onClick={handlePopUpClose} />
        <div className="pop-up-content">
          <EditJobPopUp onClose={setShowEditJobPopUp} item={selectedItem} onEdit={getJobData}/>
        </div>
      </div>
    )}
    </div>
  );
}

export default JobBox