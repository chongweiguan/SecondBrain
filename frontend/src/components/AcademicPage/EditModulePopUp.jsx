import {React, useState} from "react";
import { Button } from "@mui/material";
import axios from "axios";

const EditModulePopUp = ({ onClose, item, onEdit }) => {

  const [moduleCode, setModuleCode] = useState(item.module_code);
  const [moduleDescription, setModuleDescription] = useState(item.description);
  const [mc, setMC] = useState(item.mc);

  const [showTypePicker, setTypePicker] = useState(false);
  const [selectedType, setSelectedType] = useState(item.type);
  
  
  const handleShowTypePicker = () => { 
    setTypePicker(true);
  }

  const handleCloseTypePicker = () => {
    setTypePicker(false);
  }

  const handleSelectType = (type) => {
    setSelectedType(type);
    setTypePicker(false);
  }

  const handleCancel = () => {
    onClose(false);
  };

  const TypePicker = ({ onSelect }) => {
    const [type, setType] = useState("null");

    const handletype = (type) => {
      setType(type);
      onSelect(type);
    }

    return (
      <div style={{
        height: '122px', 
        width: '325px',
        border: '1px solid #333333',
        borderRadius: '3px',
        backgroundColor: 'black'
      }}>
        <Button
          onClick={() => handletype('Core')}
          sx={{
            width: '325px',
            height: '30px',
            color: 'white',
            '&:hover': {
                backgroundColor: '#333333'
            },
            textTransform: 'none',
            borderBottom: '1px solid #333333'
          }}
        >Core</Button>
        <Button
          onClick={() => handletype('General Elective')}
          sx={{
            width: '325px',
            color: 'white',
            height: '30px',
            textTransform: 'none',
            '&:hover': {
                backgroundColor: '#333333'
            },
            borderBottom: '1px solid #333333'
          }}
        >General Electives</Button>
        <Button
          onClick={() => handletype('Unrestricted Elective')}
          sx={{
            width: '325px',
            color: 'white',
            height: '30px',
            textTransform: 'none',
            borderBottom: '1px solid #333333',
            '&:hover': {
                backgroundColor: '#333333'
            }
          }}
        >Unrestricted Electives</Button>
        <Button
          onClick={() => handletype('Depth & Breadth')}
          sx={{
            width: '325px',
            color: 'white',
            height: '30px',
            textTransform: 'none',
            '&:hover': {
                backgroundColor: '#333333'
            }
          }}
        >Breadth & Depth</Button>
      </div>
    )
  }

  const handleUpdateModule = () => {
    const id = item.id;
    const moduleData = {
      module_code: moduleCode,
      description: moduleDescription,
      type: selectedType,
      mc: mc
    }

    axios.put(`http://localhost:3001/api/updatemodules/?id=${id}`, moduleData)
      .then(res => {
        console.log(res.data);
        onEdit();
      })
      .catch(err => {
        console.log(err);
        alert("Error occurred while updating the module")
      });
      onClose(false);
  }
  
  return (
    <div className='pop-up-container' style={{
        padding: '30px 30px',
        height:'380px',
        width: '550px',
        position: "absolute",
        top: "120%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    }}>
        <p className='pop-up-header' style={{fontSize:'25px'}}>Edit Module</p>
        <p className='pop-up-subheader' style={{fontSize:'16px'}}>Edit module here. Click Confirm when you are done.</p>
        <div style={{
          height: '200px', 
          display:'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          flexDirection: 'column'
        }}>
        <div style={{display: 'flex', gap: '20px'}}>
          <div 
            style={{
                display:'flex', 
                gap: '15px', 
                alignItems: 'center', 
          }}>
            <p style={{fontSize:'18px', fontWeight: '520'}}>Module Code</p>
          <input
            value={moduleCode}
            type="text" name="" required className="inputField" style={{width: '190px', height: '35px', fontSize: '17px'}}
            onChange={e => setModuleCode(e.target.value)}
          />
            </div>
            <div 
            style={{
                display:'flex', 
                gap: '15px', 
                alignItems: 'center', 
            }}>
            <p style={{fontSize:'18px', fontWeight: '520'}}>MC</p>
            <input
              type="text" name="" required className="inputField" style={{width: '70px', height: '35px', fontSize: '17px'}}
              value={mc}
              onChange={e => setMC(e.target.value)}
            />
            </div>
        </div>
        <div 
            style={{
            display:'flex', 
            gap: '15px', 
            alignItems: 'center', 
            padding: '20px 0px 0px 0px',
            }}>
            <p style={{fontSize:'18px', fontWeight: '520'}}>{'Module Desc.'}</p>
            <input
            type="text" name="" required className="inputField" style={{width: '325px', height: '35px', fontSize: '17px'}}
            value={moduleDescription}
            onChange={e => setModuleDescription(e.target.value)}
            />
        </div>
        <div 
            style={{
            display:'flex', 
            gap: '15px', 
            alignItems: 'center', 
            padding: '20px 0px 0px 80px',
            }}>
            <p style={{fontSize:'18px', fontWeight: '520'}}>{'Type'}</p>
            <Button 
              onClick={handleShowTypePicker}
              sx={{
                width:'325px',
                height: '35px',
                color: 'white', 
                border: '1px solid grey', 
                borderRadius: '5px', 
                padding: '5px 10px', 
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#333333'
                },
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}><p style={{fontSize: '17px'}}>{selectedType}</p></Button>
            {showTypePicker && (
              <div className='pop-up-overlay' onClick={handleCloseTypePicker}>
                <div
                  style={{
                    position: "absolute",
                    top: "27%",
                    left: '32.5%',
                    width: '170px'
                  }}
                >
                  <TypePicker onSelect={handleSelectType}/>
                </div>
              </div>
            )}
        </div>
        </div>
        <div style={{marginTop: '10px', width: '490px', display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
        <Button
            sx={{
            width: '100px',
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
            onClick={handleCancel}
        >Cancel</Button>
        <Button
            sx={{
            fontWeight: '600',
            backgroundColor: '#B6B6B6',
            width: '80x',
            fontSize: '17px',
            color: 'black', 
            border: '1px solid #5A5A5A', 
            borderRadius: '10px', 
            padding: '5px 8px', 
            textTransform: 'none',
            '&:hover': {
                backgroundColor: 'white'
            }
            }}
            onClick={handleUpdateModule}
        >Confirm</Button>
        </div>
    </div>
    )
}

export default EditModulePopUp