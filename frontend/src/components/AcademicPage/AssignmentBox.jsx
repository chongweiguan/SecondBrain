import { React, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddTaskPopUp from './AddTaskPopUp';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import OptionsPopUp from '../Others/OptionsPopUp';
import Checkbox from '@mui/material/Checkbox';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import EditTaskPopUp from './EditTaskPopUp';
import DeletePopUp from '../Others/DeletePopUp';
import axios from 'axios';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const AssignmentBox = ({user}) => {
  const [assignmentData, setAssignmentData] = useState(null)
  const [showOptionsPopUp, setShowOptionsPopUp] = useState(false);
  const [popUpPosition, setPopUpPosition] = useState({ x: 0, y: 0 });
  const [showAddTaskPopUp, setShowAddTaskPopUp] = useState(false);
  const [showEditTaskPopUp, setShowEditTaskPopUp] = useState(false);
  const [showDeleteTaskPopUp, setShowDeleteTaskPopUp] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const getAssignmentData = async () => {
    try {
      axios.get(`http://localhost:3001/api/getassignments/${user.id}`)
        .then(res => {
          setAssignmentData(res.data);
        })
    } catch (err) {
      console.error(err);
      alert("Error occurred fetching assignment Data")
    }
  }

  const handleUpdateComplete = async (id) => {
    axios.put(`http://localhost:3001/api/completeassignments/?id=${id}`)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
      alert("Error while updating complete")
    });
  }

  useEffect(() => {
    if (user && user.id) {
      getAssignmentData();
    }
  }, [user]);

  // options pop-up functions
  const handleShowOptionsPopUp = (event) => {
    const x = event.clientX - 10;
    const y = event.clientY + 10;
    setPopUpPosition({ x, y });
    setShowOptionsPopUp(true);
    
    document.body.style.overflow = 'hidden'; // Disable scrolling
  };

  const handleDeleteTaskClick = () => {
    document.body.style.overflow = 'hidden';
    setShowDeleteTaskPopUp(true);
    setShowOptionsPopUp(false);
  }

  const handleDontShowOptionsPopUp = () => {
    setShowOptionsPopUp(false);
    document.body.style.overflow = 'auto'; // Enable scrolling
  };

  //edit task function
  const handleEditTaskClick = () => {
    document.body.style.overflow = 'auto';
    setShowEditTaskPopUp(true);
    setShowOptionsPopUp(false);
  }

  // add task functions
  const handleAddTaskClick = () => {
    setShowAddTaskPopUp(true);
    document.body.style.overflow = 'auto'; // Disable scrolling
  };

  const handlePopUpClose = () => {
    setShowAddTaskPopUp(false);
    setShowEditTaskPopUp(false);
    setShowOptionsPopUp(false);
    document.body.style.overflow = 'auto'; // Enable scrolling
  };

  return (
    <div className="academic-page-box-container">
      <p className="academic-page-box-header">Assignments</p>
      <p className="academic-page-box-subheader" style={{ padding: '0px 0px 30px 0px' }}>
        Here's a list of tasks for this semester!
      </p>
      <div style={{ padding: '0px 0px 20px 0px' }}>
        <Button
          sx={{
            color: 'white',
            border: '1px solid #5A5A5A',
            borderRadius: '5px',
            padding: '5px 8px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#333333',
            },
          }}
          onClick={handleAddTaskClick}>
          <AddCircleOutlineIcon sx={{ fontSize: '15px' }} />
          <p style={{ fontSize: '15px' }}>{'\u00A0Add Task'}</p>
        </Button>
      </div>
      <div className="scroll-container" style={{ height: '400px', width: '100%' }}>
        <div className="scroll-container-element-container">
          <div className="scroll-container-element" style={{ width: '50px', color: '#a3a3a3' }}>
            ID
          </div>
          <div className="scroll-container-element" style={{ width: '300px', color: '#a3a3a3' }}>
            Task
          </div>
          <div className="scroll-container-element" style={{ width: '300px', color: '#a3a3a3' }}>
            Deadline
          </div>
          <div className="scroll-container-element" style={{ width: '100px', color: '#a3a3a3' }}>
            Complete
          </div>
          <div className="scroll-container-element" style={{ width: '80px', color: '#a3a3a3' }}></div>
        </div>
        {assignmentData &&
          assignmentData.map((item, idx) => (
            <div key={item.id} className="scroll-container-element-container">
              <div className="scroll-container-element" style={{ width: '50px' }}>
                {idx + 1}
              </div>
              <div className="scroll-container-element" style={{ width: '300px' }}>
                {item.description}
              </div>
              <div className="scroll-container-element" style={{ width: '300px' }}>
                <p style={{fontSize: '13px'}}>{item.date} {item.time}</p>
              </div>
              <div
                className="scroll-container-element"
                style={{ width: '100px', justifyContent: 'center' }}
              >
                <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                  <Checkbox 
                    color="default" 
                    sx={{height: '20px'}} 
                    defaultChecked={item.complete == 1 ? true : false}
                    onClick={(event) => {
                      handleUpdateComplete(item.id)
                    }}
                  />
              </ThemeProvider>
              </div>
              <div className="scroll-container-element" style={{ width: '80px', justifyContent: 'center' }}>
                <Button
                  sx={{
                    height: '20px',
                    '&:hover': { backgroundColor: '#333333' },
                  }}
                  onClick={(event) => {
                    handleShowOptionsPopUp(event)
                    setSelectedItem(item)
                  }}
                >
                  <MoreHorizIcon sx={{ color: 'white' }} />
                </Button>
              </div>
            </div>
          ))}
        {showOptionsPopUp && (
          <div className="pop-up-overlay" onClick={handleDontShowOptionsPopUp}>
            <div style={{ position: 'absolute', top: popUpPosition.y, left: popUpPosition.x }}>
              <OptionsPopUp onEditClick={handleEditTaskClick} onDeleteClick={handleDeleteTaskClick}/>
            </div>
          </div>
        )}
      </div>
      {showAddTaskPopUp && (
        <div className="pop-up-overlay">
          <div className="pop-up-background" onClick={handlePopUpClose} />
          <div className="pop-up-content">
            <AddTaskPopUp user={user} onClose={setShowAddTaskPopUp} onAdd={getAssignmentData}/>
          </div>
        </div>
      )}
      {showEditTaskPopUp && (
      <div className="pop-up-overlay">
        <div className="pop-up-background" onClick={handlePopUpClose} />
        <div className="pop-up-content">
          <EditTaskPopUp onClose={setShowEditTaskPopUp} item={selectedItem} onEdit={getAssignmentData}/>
        </div>
      </div>
    )}
    {showDeleteTaskPopUp && (
      <div className="pop-up-overlay">
        <div className="pop-up-background" onClick={handlePopUpClose} />
        <div className="pop-up-content">
          <DeletePopUp onClose={setShowDeleteTaskPopUp} item={selectedItem} onDelete={getAssignmentData} type='assignments'/>
        </div>
      </div>
    )}
    </div>
  );
};

export default AssignmentBox;
