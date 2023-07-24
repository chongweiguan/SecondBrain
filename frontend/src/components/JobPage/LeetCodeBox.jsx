import {React, useState, useEffect}from "react";

const LeetCode = ({user}) => {
    
  const [leetcodeData, setLeetcodeData] = useState(null);

  const calculatePercentage = (completed, total) => {
    return (completed / total) * 100;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${user.leetcode}`);
        const data = await response.json();
        setLeetcodeData(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [user]);

  if(!leetcodeData || !user) {
    return <p>Loading...</p>
  }

  const Bars = () => {
    return (
      <div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize:'15px'}}>
            Easy: {leetcodeData.easySolved} / {leetcodeData.totalEasy}
        </p>
        <div className="progress-bar-border" style={{ width: '340px', height: '40px', padding: '4px' }}>
            <div
            className="progress-bar"
            style={{ width: `${calculatePercentage(leetcodeData.easySolved, leetcodeData.totalEasy)}%`, backgroundColor: 'green', height: '29px' }}
            />
        </div>

        </div>
        <div style={{ display: 'flex', padding: '10px 0px 0px 0px', flexDirection: 'column' }}>
        <p style={{fontSize:'15px'}}>
            Medium: {leetcodeData.mediumSolved} / {leetcodeData.totalMedium}
        </p>
        <div className="progress-bar-border" style={{ width: '340px', height: '40px', padding: '4px' }}>
            <div
            className="progress-bar"
            style={{ width: `${calculatePercentage(leetcodeData.mediumSolved, leetcodeData.totalMedium)}%`, backgroundColor: 'orange', height: '29px' }}
            />
        </div>
        </div>
        <div style={{ display: 'flex', padding: '10px 0px 0px 0px', flexDirection: 'column' }}>
        <p style={{fontSize:'15px' }}>
            Hard: {leetcodeData.hardSolved} / {leetcodeData.totalHard}
        </p>
        <div className="progress-bar-border" style={{ width: '340px', height: '40px', padding: '5px' }}>
            <div
            className="progress-bar"
            style={{ width: `${calculatePercentage(leetcodeData.hardSolved, leetcodeData.totalHard)}%`, backgroundColor: 'red', height: '29px' }}
            />
        </div>
        </div>
      </div>
    )
  }

  return (
    <div className='academic-page-box-container' style={{height: '300px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px'}}>
      <div style={{display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems: 'center', gap: '10px'}}>
        <p style={{fontSize: '25px', fontWeight: '600'}}>LEETCODE</p>
        <div style={{border: '10px solid purple', height: '200px', width: '200px', borderRadius: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>
          <p style={{fontSize: '45px'}}>{leetcodeData.totalSolved}</p>
          <p>Solved</p>
        </div>
      </div>
        <div style={{width: '350px', height: '220px'}}>
          <Bars />
        </div>
    </div>
  );
}

export default LeetCode;