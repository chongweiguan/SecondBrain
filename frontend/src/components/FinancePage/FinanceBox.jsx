import {React, useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import OptionsPopUp from '../Others/OptionsPopUp';
import DeletePopUp from '../Others/DeletePopUp';
import AddExpensesPopUp from './AddExpensesPopUp';
import EditExpensesPopUp from './EditExpensesPopUp';
import { formatDateTime } from '../../utils/DateTimeParser';

const FinanceBox = ({user, financeData, getData}) => {

  const [showOptionsPopUp, setShowOptionsPopUp] = useState(false);
  const [popUpPosition, setPopUpPosition] = useState({ x: 0, y: 0 });

  const [showAddExpensePopUp, setShowAddExpensePopUp] = useState(false);
  const [showEditExpensePopUp, setShowEditExpensePopUp] = useState(false);
  const [showDeleteExpensePopUp, setShowDeleteExpensePopUp] = useState(false); 

  const [selectedItem, setSelectedItem] = useState(null);

  const handleShowOptionsPopUp = (event) => {
    const x = event.clientX - 10;
    const y = event.clientY + 10;
    setPopUpPosition({ x, y });
    setShowOptionsPopUp(true);
    document.body.style.overflow = 'hidden'; // Disable scrolling
  }

  const handleDontShowOptionsPopUp = () => {
    setShowOptionsPopUp(false);
    document.body.style.overflow = 'auto'; // Enable scrolling
  }

  const handleDeleteExpenseClick = () => {
    document.body.style.overflow = 'hidden';
    setShowDeleteExpensePopUp(true);
    setShowOptionsPopUp(false);
  }

  const handleEditExpenseClick = () => {
    document.body.style.overflow = 'hidden';
    setShowEditExpensePopUp(true);
    setShowOptionsPopUp(false);
  }

  const handleAddExpenseClick = () => {
    setShowAddExpensePopUp(true);
    document.body.style.overflow = 'auto';
  };

  const handlePopUpClose = () => {
    setShowAddExpensePopUp(false);
    setShowEditExpensePopUp(false);
    setShowOptionsPopUp(false);
    setShowDeleteExpensePopUp(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className='finance-box-container'>
      <p className='academic-page-box-header'>Expenses</p>
      <p className='academic-page-box-subheader' style={{padding: '0px 0px 30px 0px'}}>Here are the list of your expenses!</p>
      <div style={{padding: '0px 0px 20px 0px'}}>
        <Button 
          sx={{
            color: 'white', 
            border: '1px solid #5A5A5A', 
            borderRadius: '5px', 
            padding: '5px 8px', 
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#333333'
            }
          }}
          onClick={handleAddExpenseClick}
          >
          <AddCircleOutlineIcon sx={{fontSize: '15px'}}/>
          <p style={{fontSize:'15px'}}>{'\u00A0Add Expense'}</p>
        </Button>
      </div>
      <div className="scroll-container" style={{height: '480px', width: '100%'}}>
      <div className='scroll-container-element-container'>
        <div className="scroll-container-element" style={{width: '60px', color: '#a3a3a3', fontSize: '16px'}}>ID</div>
        <div className="scroll-container-element" style={{width: '350px', color: '#a3a3a3', fontSize: '16px'}}>Description</div>
        <div className="scroll-container-element" style={{width: '150px', color: '#a3a3a3', fontSize: '16px'}}>Expense</div>
        <div className="scroll-container-element" style={{width: '170px', color: '#a3a3a3', fontSize: '16px'}}>Date</div>
        <div className="scroll-container-element" style={{width: '80px', color: '#a3a3a3', fontSize: '16px'}}></div>
      </div>
      {financeData && financeData.map((item, idx) => (
        <div key={item.id} className="scroll-container-element-container">
        <div className="scroll-container-element" style={{width: '60px', fontSize: '16px'}}>{idx+1}</div>
        <div className="scroll-container-element" style={{width: '350px', fontSize: '16px'}}>{item.description}</div>
        <div className="scroll-container-element" style={{width: '150px', fontSize: '16px', fontWeight: '600', color: item.amount < 0 ? 'red' : 'lime'}}>SGD {item.amount}</div>
        <div className="scroll-container-element" style={{width: '170px', fontSize: '16px'}}>{item.date}</div>
        <div className="scroll-container-element" style={{width: '80px', justifyContent: 'center'}}>
        <Button
          sx={{
            height: '20px',
            borderRadius: '10px',
            padding: '10px',
            '&:hover': {
              backgroundColor: '#333333'
            }
          }}
          onClick={(event) => {
            handleShowOptionsPopUp(event)
            setSelectedItem(item)
          }}
        >
          <MoreHorizIcon 
            sx={{
              color: 'white',
            }}
          />
        </Button>
        </div>
        </div>
      ))}
      </div>
      {showOptionsPopUp && (
        <div className='pop-up-overlay' onClick={handleDontShowOptionsPopUp}>
          <div style={{ position: 'absolute', top: popUpPosition.y, left: popUpPosition.x }}>
            <OptionsPopUp onEditClick={handleEditExpenseClick} onDeleteClick={handleDeleteExpenseClick}/>
          </div>
        </div>
      )}
      {showDeleteExpensePopUp && (
      <div className="pop-up-overlay">
        <div className="pop-up-background" onClick={handlePopUpClose} />
        <div className="pop-up-content">
          <DeletePopUp onClose={setShowDeleteExpensePopUp} item={selectedItem} onDelete={getData} type='finance'/>
        </div>
      </div>
    )}
    {showAddExpensePopUp && (
        <div className="pop-up-overlay">
          <div className="pop-up-background" onClick={handlePopUpClose} />
          <div className="pop-up-content">
            <AddExpensesPopUp onClose={setShowAddExpensePopUp} user={user} onAdd={getData} />
          </div>
        </div>
      )}
      {showEditExpensePopUp && (
      <div className="pop-up-overlay">
        <div className="pop-up-background" onClick={handlePopUpClose} />
        <div className="pop-up-content">
          <EditExpensesPopUp onClose={setShowEditExpensePopUp} item={selectedItem} onEdit={getData}/>
        </div>
      </div>
    )}
    </div>
  );
}

export default FinanceBox