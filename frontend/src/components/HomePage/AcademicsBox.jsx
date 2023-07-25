import { React, useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import axios from 'axios';

const AcademicBox = ({ user }) => {

  const [assignmentData, setAssignmentData] = useState(null);
  const [examsData, setExamData] = useState(null);

  const getAssignmentData = async () => {
    try {
      axios.get(`https://second-brain-iab6.onrender.com/api/getassignments/${user.id}`)
        .then(res => {
          setAssignmentData(res.data);
        })
    } catch (err) {
      console.error(err);
      alert("Error occurred fetching assignment Data")
    }
  }

  const getExamData = async () => {
    try {
      axios.get(`https://second-brain-iab6.onrender.com/api/getexams/${user.id}`)
        .then(res => {
          setExamData(res.data);
        })
    } catch (err) {
      console.error(err);
      alert("Error occurred fetching exam data")
    }
  }

  useEffect(() => {
    if (user && user.id) {
      getAssignmentData();
      getExamData();
    }
  }, [user]);

    return (
      <div className="home-page-box-container">
        <header className="home-page-box-header">
          <Link to="/academics">📔 Academics</Link>
        </header>
        <p className="home-page-box-subheader text-center">AY2023/2024, Semester 1</p>
        <p className="home-page-box-subheader" style={{padding: '5px'}}>Assignments</p>
        <div className='scroll-container' style={{
          height: '192px',
          width: '405px'
        }}>
          <div className='scroll-container-element-container'>
            <div className="scroll-container-element" style={{width: '200px', color: '#a3a3a3'}}>Task</div>
            <div className="scroll-container-element" style={{width: '200px', color: '#a3a3a3'}}>Deadline</div>
          </div>
          {assignmentData && assignmentData.slice().reverse().map(item => (
            <div key={item.id} className="scroll-container-element-container">
              <div className="scroll-container-element" style={{width: '200px'}}>{item.description}</div>
              <div className="scroll-container-element" style={{width: '200px'}}>{item.date} {item.time}</div>
            </div>
          ))}
        </div>
        <p className="home-page-box-subheader" style={{padding: '15px 5px 5px 5px'}}>Exams</p>
        <div className='scroll-container' style={{
          height: '192px',
          width: '405px'
        }}>
          <div className='scroll-container-element-container'>
            <div className="scroll-container-element" style={{width: '180px', color: '#a3a3a3'}}>Exam</div>
            <div className="scroll-container-element" style={{width: '250px', color: '#a3a3a3'}}>Data Time</div>
            <div className="scroll-container-element" style={{width: '100px', color: '#a3a3a3'}}>Venue</div>
          </div>
          {examsData && examsData.map(item => (
            <div key={item.id} className="scroll-container-element-container">
              <div className="scroll-container-element" style={{width: '180px'}}>{item.description}</div>
              <div className="scroll-container-element" style={{width: '250px'}}>{item.date} {item.time}</div>
              <div className="scroll-container-element" style={{width: '100px'}}>{item.venue}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  export default AcademicBox