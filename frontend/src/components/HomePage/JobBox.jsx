import {React, useEffect, useState} from 'react';
import { Link } from "react-router-dom"
import LeetCode from "../Others/LeetCode"
import axios from 'axios';

const JobBox = ({ user }) => {
  
  const [jobData, setJobData] = useState(null);

  const getJobData = async () => {
    try {
      axios.get(`http://localhost:3001/api/getjobs/${user.id}`)
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

  return (
    <div className="home-page-box-container">
      <header className="home-page-box-header">
        <Link to="/jobs">🚀 Jobs & Internship</Link>
      </header>
      <LeetCode leetcode={user.leetcode}/>
      <hr className="line-break" style={{ margin: '20px 5px 10px 5px'}} />
      <p className="home-page-box-subheader" style={{padding: '5px 5px'}}>Jobs Applied</p>
      <div className='scroll-container' style={{
        height: '310px',
        width: '405px'
      }}>
        <div className='scroll-container-element-container'>
          <div className="scroll-container-element" style={{width: '200px', color: '#a3a3a3'}}>Company</div>
          <div className="scroll-container-element" style={{width: '180px', color: '#a3a3a3'}}>Status</div>
          <div className="scroll-container-element" style={{width: '200px', color: '#a3a3a3'}}>Deadline</div>
        </div>
        {jobData && jobData.map(item => (
          <div key={item.id} className="scroll-container-element-container">
            <div className="scroll-container-element" style={{width: '200px'}}>{item.company}</div>
            <div className="scroll-container-element" style={{width: '180px'}}>{item.status}</div>
            <div className="scroll-container-element" style={{width: '200px'}}>{item.next_deadline}</div>
          </div>
        ))}
      </div>
    </div>
    )
  }

  export default JobBox