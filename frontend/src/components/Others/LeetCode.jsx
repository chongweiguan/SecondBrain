import {React, useState, useEffect}from "react";

const LeetCode = () => {
    
  const [leetcodeData, setLeetcodeData] = useState(null);

  const calculatePercentage = (completed, total) => {
    return (completed / total) * 100;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://leetcode-stats-api.herokuapp.com/weiguanchong123');
        const data = await response.json();
        setLeetcodeData(data);
        console.log(leetcodeData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if(!leetcodeData) {
    return <p>Loading...</p>
  }

  return (
    <div>
        <p className="home-page-box-subheader">LEETCODE: {leetcodeData.totalSolved} Solved</p>
        <div style={{ display: 'flex', padding: '0px 0px 0px 20px' }}>
        <div className="progress-bar-border" style={{ width: '350px' }}>
            <div
            className="progress-bar"
            style={{ width: `${calculatePercentage(leetcodeData.easySolved, leetcodeData.totalEasy)}%`, backgroundColor: 'green' }}
            />
        </div>
        <p style={{ padding: '0px 10px' }}>
            Easy: {leetcodeData.easySolved} / {leetcodeData.totalEasy}
        </p>
        </div>
        <div style={{ display: 'flex', padding: '10px 0px 0px 20px' }}>
        <div className="progress-bar-border" style={{ width: '350px' }}>
            <div
            className="progress-bar"
            style={{ width: `${calculatePercentage(leetcodeData.mediumSolved, leetcodeData.totalMedium)}%`, backgroundColor: 'orange' }}
            />
        </div>
        <p style={{ padding: '0px 10px' }}>
            Medium: {leetcodeData.mediumSolved} / {leetcodeData.totalMedium}
        </p>
        </div>
        <div style={{ display: 'flex', padding: '10px 0px 0px 20px' }}>
        <div className="progress-bar-border" style={{ width: '350px' }}>
            <div
            className="progress-bar"
            style={{ width: `${calculatePercentage(leetcodeData.hardSolved, leetcodeData.totalHard)}%`, backgroundColor: 'red' }}
            />
        </div>
        <p style={{ padding: '0px 10px' }}>
            Hard: {leetcodeData.hardSolved} / {leetcodeData.totalHard}
        </p>
        </div>
    </div>
  );
}

export default LeetCode;