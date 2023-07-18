import React from 'react'
import Banner from '../components/Others/Banner'
import banner2 from '../assets/banner2.mp4';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import { financeData } from '../data/dummy';
import { formatDateTime } from '../utils/DateTimeParser';
import Button from '@mui/material/Button';
import FinanceBox from '../components/FinancePage/FinanceBox';

Chart.register(ArcElement);

const DonutChart = ({ percentage }) => {
  const data = {
    labels: ['Spent', 'Remaining'],
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: ['white', 'black'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '87%',
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
    width: '320px',
    height: '240px',
    borderRadius: '1px',
    overflow: 'hidden',
  };

  const percentageStyle = {
    position: 'absolute',
    top: '46%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontSize: '45px',
    fontWeight: '500',
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
      <Doughnut data={data} options={options} />
      <div style={percentageStyle}>{percentage}%</div>
      <div style={used}>used</div>
    </div>
  );
};

const FinancePage = () => {

  // Get the current month (0 - January, 1 - February, etc.)
  const currentMonth = new Date().getMonth() + 1;

  // Filter the financeData for the current month
  const filteredData = financeData.filter((item) => {
    const [day, month, year] = item.dateTime.split('/'); // Split the date components
    const dateTime = new Date(`${year}-${month}-${day}`);
    const itemMonth = dateTime.getMonth() + 1;
    return itemMonth === currentMonth;
  });

  // Calculate the total spent for the current month
  const totalSpent = filteredData.reduce((total, item) => total - parseFloat(item.amount), 0);

  // Define the total budget
  const totalBudget = 800;

  // Calculate the percentage spent
  const percentageSpent = ((totalSpent / totalBudget) * 100).toFixed(2);;

  return (
    <div className="black-background">
      <Banner bannerPath={banner2} logo={'💵'} />
      <h1 className="page-header">
          &#123; Expenses & Finances &#125;
        </h1>
        <h1 className="page-subHeader">
          💰 &nbsp;&nbsp;Money, Money, Money
        </h1>
        <hr className="line-break" />
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px'}}>
          <p style={{fontSize: '20px'}}>Period: 1 July 2023 - 31 July 2023</p>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <div >
            <DonutChart percentage={percentageSpent}/>
          </div>
          <div style={{ display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', marginLeft: '20px'}}>
            <p style={{fontSize: '60px', fontWeight:'500'}}>${totalSpent}</p>
            <p style={{fontSize: '20px', fontWeight:'500'}}>out of $800</p>
          </div>
          <div style={{height: '300px', width: '600px', display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center', padding: '40px 60px'}}>
            <div style={{display: 'flex', gap: '20px'}}>
              <p style={{fontWeight: '500'}}>Week 1</p>
              <div className='progress-bar' style={{width: '300px', height: '25px', backgroundColor: 'white', borderRadius: '10px'}}/>
              <p style={{fontWeight: '500'}}>$250.16</p>
            </div>
            <div style={{display: 'flex', gap: '20px'}}>
              <p style={{fontWeight: '500'}}>Week 2</p>
              <div className='progress-bar' style={{width: '250px', height: '25px', backgroundColor: 'white', borderRadius: '10px'}}/>
              <p style={{fontWeight: '500'}}>$150.16</p>
            </div>
            <div style={{display: 'flex', gap: '20px'}}>
              <p style={{fontWeight: '500'}}>Week 3</p>
              <div className='progress-bar' style={{width: '250px', height: '25px', backgroundColor: 'white', borderRadius: '10px'}}/>
              <p style={{fontWeight: '500'}}>$150.16</p>
            </div>
            <div style={{display: 'flex', gap: '20px'}}>
              <p style={{fontWeight: '500'}}>Week 4</p>
              <div className='progress-bar' style={{width: '280px', height: '25px', backgroundColor: 'white', borderRadius: '10px'}}/>
              <p style={{fontWeight: '500'}}>$180.16</p>
            </div>
          </div>
        </div>
        <hr className="line-break" />
        <div>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '60px'}}>
          <Button
            sx={{
              width: '120px',
              fontSize: '17px',
              color: 'white', 
              border: '1px solid #5A5A5A', 
              borderRadius: '10px', 
              padding: '5px 8px', 
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#333333'
              }
            }}
          >February</Button>
          <Button
            sx={{
              width: '120px',
              fontSize: '17px',
              color: 'white', 
              border: '1px solid #5A5A5A', 
              borderRadius: '10px', 
              padding: '5px 8px', 
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#333333'
              }
            }}
          >March</Button>
          <Button
            sx={{
              width: '120px',
              fontSize: '17px',
              color: 'white', 
              border: '1px solid #5A5A5A', 
              borderRadius: '10px', 
              padding: '5px 8px', 
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#333333'
              }
            }}
          >April</Button>
          <Button
            sx={{
              width: '120px',
              fontSize: '17px',
              color: 'white', 
              border: '1px solid #5A5A5A', 
              borderRadius: '10px', 
              padding: '5px 8px', 
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#333333'
              }
            }}
          >May</Button>
          <Button
            sx={{
              width: '120px',
              fontSize: '17px',
              color: 'white', 
              border: '1px solid #5A5A5A', 
              borderRadius: '10px', 
              padding: '5px 8px', 
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#333333'
              }
            }}
          >June</Button>
          <Button
            sx={{
              width: '120px',
              fontSize: '17px',
              color: 'white', 
              border: '1px solid #5A5A5A', 
              borderRadius: '10px', 
              padding: '5px 8px', 
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#333333'
              }
            }}
          >July</Button>
          </div>
        </div>
        <div style={{padding: '50px 200px 50px 200px'}}>
          <FinanceBox />
        </div>
    </div>
  )
}

export default FinancePage