import { React, useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import { financeData } from "../../data/dummy";
import { formatDateTime } from "../../utils/DateTimeParser";
import axios from 'axios';
import dayjs from 'dayjs';

Chart.register(ArcElement);

const DonutChart = ({ percentage }) => {
  const data = {
    labels: ['Data 1', 'Data 2'],
    datasets: [
    {
      data: [percentage, 100 - percentage],
      backgroundColor: ['white', 'black'],
      borderWidth: 0,
    },
    ],
  };

  const options = {
    cutout: '87%', // Adjust the cutout value to make the donut thinner
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      arc: {
        borderRadius: 10,
      },
    },
    plugins: {
      legend: false,
    },
  };

  const containerStyle = {
    position: 'relative',
    width: '260px', // Adjust the width of the container div
    height: '210px', // Adjust the height of the container div
    borderRadius: '1px', // Adjust the border radius of the container div
    overflow: 'hidden', // Clip the chart inside the container div
  };

  const percentageStyle = {
    position: 'absolute',
    top: '46%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontSize: '45px',
  };
  const used = {
    position: 'absolute',
    top: '65%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontSize: '20px',
  };

  return (
    <div style={containerStyle}>
    <Doughnut data={data} options={options}/>
    <div style={percentageStyle}>{percentage}%</div>
    <div style={used}>used</div>
    </div>
  );
};

const FinanceBox = ({ user }) => {

  const [financeData, setFinanceData] = useState(null);
  const [filteredFinanceData, setFilteredFinanceData] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [formattedPeriod, setFormattedPeriod] = useState('');

  const getFinanceData = async () => {
    try {
      axios.get(`https://second-brain-iab6.onrender.com/api/getfinance/${user.id}`)
        .then(res => {
          setFinanceData(res.data);
        })
    } catch (err) {
      console.error(err);
      alert("Error occurred fetching finance Data")
    }
  }

  const totalSpent = filteredFinanceData
  ? filteredFinanceData.reduce(
      (sum, item) => item.amount < 0 ? sum - parseFloat(item.amount) : sum,
      0
    ).toFixed(2)
  : 0;

  // Define the total budget
  const totalBudget = 800;

  // Calculate the percentage spent
  const percentageSpent = ((totalSpent / totalBudget) * 100).toFixed(2);

  const filterDataByMonth = (month) => {
    if (!financeData) return null;

    const filteredData = financeData.filter((item) => {
      // Assuming the date field is stored as 'date' in the financeData
      const dateString = item.date;
      const dateObject = new Date(dateString);
      const itemMonth = dateObject.getMonth() + 1; // JavaScript months are 0-indexed (0 to 11)
      return itemMonth === month;
    });

    return filteredData;
  };

  useEffect(() => {
    if (user && user.id) {
      getFinanceData();
      const currentMonth = dayjs().month()+1;
      setSelectedMonth(currentMonth);
    }
  }, [user]);

  useEffect(() => {
    // Check if financeData and selectedMonth are available before filtering
    if (financeData && selectedMonth) {
      const currentMonthData = filterDataByMonth(selectedMonth);
      setFilteredFinanceData(currentMonthData);
      const startOfMonth = dayjs().month(selectedMonth - 1).startOf('month').format('D MMM YYYY');
      const endOfMonth = dayjs().month(selectedMonth - 1).endOf('month').format('D MMM YYYY');
      setFormattedPeriod(`${startOfMonth} - ${endOfMonth}`);
    }
  }, [financeData, selectedMonth]);

  return (
    <div className="home-page-box-container">
    <header className="home-page-box-header">
      <Link to="/finance">💵 Finance</Link>
    </header>
    <div style={{display:'flex'}}>
      <DonutChart percentage={percentageSpent}/>
      <div style={{ display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', marginLeft: '10px', width: '200px'}}>
      <p style={{fontSize: '13px'}}>{formattedPeriod}</p>
      <p style={{fontSize: '50px', fontWeight:'500'}}>${totalSpent}</p>
      <p style={{fontSize: '16px', fontWeight:'500'}}>out of $800</p>
      </div>
    </div>
    <hr className="line-break" style={{ margin: '15px 10px'}} />
    <div className='scroll-container' style={{
      height: '270px',
      width: '405px'
    }}>
      {filteredFinanceData && filteredFinanceData.slice().reverse().map(item => (
        <div className="scroll-container-element-container" style={{display:'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0px 8px 10px'}}>
        <div>
          <p style={{fontSize: '16px'}}>{item.description}</p>
            <p style={{color: '#A1A1A1', fontSize: '12px'}}>{item.date}</p>
          </div>
          <p style={{color:'red', fontSize: '14px', fontWeight: '600'}}>SGD -11.60</p>
        </div>
      ))}
    </div>
    </div>
  )
  }
  
  export default FinanceBox