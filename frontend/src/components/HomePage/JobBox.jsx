import React from "react"
import { Link } from "react-router-dom"
import { jobData } from "../../data/dummy"
import LeetCode from "../Others/LeetCode"

const JobBox = () => {
    return (
      <div className="home-page-box-container">
        <header className="home-page-box-header">
          <Link to="/jobs">🚀 Jobs & Internship</Link>
        </header>
        <LeetCode />
        <hr className="line-break" style={{ margin: '20px 5px 10px 5px'}} />
        <p className="home-page-box-subheader" style={{padding: '5px 5px'}}>Jobs Applied</p>
        <div className='scroll-container' style={{
          height: '310px',
          width: '405px'
        }}>
          <div className='scroll-container-element-container'>
            <div className="scroll-container-element" style={{width: '200px', color: '#a3a3a3'}}>Company</div>
            <div className="scroll-container-element" style={{width: '180px', color: '#a3a3a3'}}>Status</div>
            <div className="scroll-container-element" style={{width: '110px', color: '#a3a3a3'}}>Deadline</div>
          </div>
          {jobData && jobData.map(item => (
            <div key={item.id} className="scroll-container-element-container">
              <div className="scroll-container-element" style={{width: '200px'}}>{item.company}</div>
              <div className="scroll-container-element" style={{width: '180px'}}>{item.status}</div>
              <div className="scroll-container-element" style={{width: '110px'}}>{item.next_deadline}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  export default JobBox