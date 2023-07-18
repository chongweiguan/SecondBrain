import React from "react"
import { Link } from "react-router-dom"
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import { financeData } from "../../data/dummy";
import { formatDateTime } from "../../utils/DateTimeParser";


Chart.register(ArcElement);

const DonutChart = () => {
  const data = {
    labels: ['Data 1', 'Data 2'],
    datasets: [
    {
      data: [90, 10],
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
    <div style={percentageStyle}>85%</div>
    <div style={used}>used</div>
    </div>
  );
};

const FinanceBox = () => {
  return (
    <div className="home-page-box-container">
    <header className="home-page-box-header">
      <Link to="/finance">💵 Finance</Link>
    </header>
    <div style={{display:'flex'}}>
      <DonutChart />
      <div style={{ display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', marginLeft: '10px'}}>
      <p style={{fontSize: '13px'}}>1 May 2023 - 31 May 2023</p>
      <p style={{fontSize: '50px', fontWeight:'500'}}>$678.14</p>
      <p style={{fontSize: '16px', fontWeight:'500'}}>out of $800</p>
      </div>
    </div>
    <hr className="line-break" style={{ margin: '15px 10px'}} />
    <div className='scroll-container' style={{
      height: '270px',
      width: '405px'
    }}>
      {financeData && financeData.map(item => (
        <div style={{display:'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0px 8px 10px'}}>
        <div>
          <p style={{fontSize: '16px'}}>{item.description}</p>
            <p style={{color: '#A1A1A1', fontSize: '12px'}}>{formatDateTime(item.dateTime)}</p>
          </div>
          <p style={{color:'red', fontSize: '14px', fontWeight: '600'}}>SGD -11.60</p>
        </div>
      ))}
    </div>
    </div>
  )
  }
  
  export default FinanceBox