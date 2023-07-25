import { React, useState, useEffect } from 'react';
import Banner from '../components/Others/Banner'
import banner2 from '../assets/banner2.mp4';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import { formatDateTime } from '../utils/DateTimeParser';
import Button from '@mui/material/Button';
import FinanceBox from '../components/FinancePage/FinanceBox';
import NavBar from '../components/Others/NavBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

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

  const [financeData, setFinanceData] = useState(null);
  const [filteredFinanceData, setFilteredFinanceData] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [formattedPeriod, setFormattedPeriod] = useState('');
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

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

  const auth = async () => {
    try {
      const res = await axios.get('https://second-brain-iab6.onrender.com/api/login', { withCredentials: true });
      console.log(res);
      if (res.data.loggedIn) {
        setUser(res.data.user);
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    auth();
    const currentMonth = dayjs().month()+1;
    setSelectedMonth(currentMonth);
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1350);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (user) {
      getFinanceData();
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

  const handleLogout = () => {
    axios.get('https://second-brain-iab6.onrender.com/api/logout', { withCredentials: true })
    .then(res => {
      location.reload(true);
    }).catch(err => console.log(err));
  }

  if(!financeData) {
    return null;
  }

  const handleSelectMonth = (idx) => {
    setSelectedMonth(idx)
  }

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

  // Calculate the total spent for the current month
  const totalSpent = filteredFinanceData
    ? filteredFinanceData.reduce((sum, item) => item.amount < 0 ? sum - parseInt(item.amount) : sum - 0, 0)
    : 0;

  // Define the total budget
  const totalBudget = 800;

  // Calculate the percentage spent
  const percentageSpent = ((totalSpent / totalBudget) * 100).toFixed(2);

  const splitByWeeks = () => {
    if (!filteredFinanceData) return {};

    const weeksData = {
      week1: 0,
      week2: 0,
      week3: 0,
      week4: 0,
    };

    filteredFinanceData.forEach((item) => {
      const dateObject = dayjs(item.date);
      const weekNumber = dateObject.$W;
      weekNumber < 5 && item.amount < 0 ? weeksData[`week${weekNumber}`] -= parseInt(item.amount) : null;
    });

    return weeksData;
  };

  // Get the amounts spent in each week
  const amountsByWeeks = splitByWeeks();
  console.log(amountsByWeeks)

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]

  return (
    <div className="black-background">
      <Banner bannerPath={banner2} logo={'💵'} />
      <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', flexDirection: isSmallScreen ? 'column' : 'row'}}>
        <div>
          <h1 className="page-header">
            &#123; Expenses & Finances &#125;
          </h1>
          <h1 className="page-subHeader">
            💰 &nbsp;&nbsp;Money, Money, Money
          </h1>
        </div>
        <NavBar logout={handleLogout}/>
      </div>
        <hr className="line-break" />
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px'}}>
          <p style={{fontSize: '20px'}}>Period: {formattedPeriod}</p>
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
          {amountsByWeeks &&
            Object.entries(amountsByWeeks).map(([week, amount]) => (
              <div key={week} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <p style={{ fontWeight: '500' }}>Week {week.slice(4)}</p>
                <div style={{width: '300px'}}>
                  <div
                    className='progress-bar'
                    style={{
                      width: `${(amount / totalBudget) * 300}px`,
                      height: '25px',
                      backgroundColor: 'white',
                      borderRadius: '10px',
                    }}
                  />
                </div>
                <p style={{ fontWeight: '500' }}>SGD {amount}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', padding: '30px'}}>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap', width: '900px'}}>
          {months && months.map((month, idx) => (
              <div>
                <Button
                onClick={() => handleSelectMonth(idx+1)}
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
              >{month}</Button>
              </div>
             ))}
          </div>
        </div>
        <hr className="line-break" />
        <div style={{padding: '50px', display: 'flex', justifyContent: 'center'}}>
          <FinanceBox user={user} financeData={financeData} getData={getFinanceData}/>
        </div>
    </div>
  )
}

export default FinancePage