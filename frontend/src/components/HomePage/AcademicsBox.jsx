import React from "react"
import { Link } from "react-router-dom"
import { examsData, assignmentData } from "../../data/dummy"

const AcademicBox = () => {
    return (
      <div className="home-page-box-container">
        <header className="home-page-box-header">
          <Link to="/academics">📔 Academics</Link>
        </header>
        <p className="home-page-box-subheader text-center">Summer Break</p>
        <p className="home-page-box-subheader" style={{padding: '5px'}}>Assignments</p>
        <div className='scroll-container' style={{
          height: '248px',
          width: '610px'
        }}>
          <div className='scroll-container-element-container'>
            <div className="scroll-container-element" style={{width: '180px', color: '#a3a3a3'}}>Task</div>
            <div className="scroll-container-element" style={{width: '250px', color: '#a3a3a3'}}>Deadline</div>
            <div className="scroll-container-element" style={{width: '100px', color: '#a3a3a3'}}>Complete</div>
          </div>
          {assignmentData && assignmentData.map(item => (
            <div key={item.id} className="scroll-container-element-container">
              <div className="scroll-container-element" style={{width: '180px'}}>{item.description}</div>
              <div className="scroll-container-element" style={{width: '250px'}}>{item.dateTime}</div>
              <div className="scroll-container-element" style={{width: '100px', justifyContent: 'center'}}>{item.complete}</div>
            </div>
          ))}
        </div>
        <p className="home-page-box-subheader" style={{padding: '15px 5px 5px 5px'}}>Exams</p>
        <div className='scroll-container' style={{
          height: '248px',
          width: '610px'
        }}>
          <div className='scroll-container-element-container'>
            <div className="scroll-container-element" style={{width: '180px', color: '#a3a3a3'}}>Exam</div>
            <div className="scroll-container-element" style={{width: '250px', color: '#a3a3a3'}}>Data Time</div>
            <div className="scroll-container-element" style={{width: '100px', color: '#a3a3a3'}}>Venue</div>
          </div>
          {examsData && examsData.map(item => (
            <div key={item.id} className="scroll-container-element-container">
              <div className="scroll-container-element" style={{width: '180px'}}>{item.description}</div>
              <div className="scroll-container-element" style={{width: '250px'}}>{item.dateTime}</div>
              <div className="scroll-container-element" style={{width: '100px'}}>{item.venue}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  export default AcademicBox