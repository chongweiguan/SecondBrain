import React from 'react';
import { moduleData } from '../../data/dummy';

const ModuleProgress = () => {
  // Calculate the total completed MCs for each category
  const coreTotalMC = moduleData
    .filter((module) => module.type === 'Core')
    .reduce((acc, module) => acc + module.mc, 0);

  const genEleTotalMC = moduleData
    .filter((module) => module.type === 'General Elective')
    .reduce((acc, module) => acc + module.mc, 0);

  const unrestEleTotalMC = moduleData
    .filter((module) => module.type === 'Unrestricted Elective')
    .reduce((acc, module) => acc + module.mc, 0);

  const breadthDepthTotalMC = moduleData
    .filter((module) => module.type === 'Breadth & Depth')
    .reduce((acc, module) => acc + module.mc, 0);

  const coreMaxMC = 64;
  const genEleMaxMC = 16;
  const unrestEleMaxMC = 40;
  const breadthDepthMaxMC = 40;

  const coreProgress = (coreTotalMC / coreMaxMC) * 100;
  const genEleProgress = (genEleTotalMC / genEleMaxMC) * 100;
  const unrestEleProgress = (unrestEleTotalMC / unrestEleMaxMC) * 100;
  const breadthDepthProgress = (breadthDepthTotalMC / breadthDepthMaxMC) * 100;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <p>Core: {coreTotalMC} / {coreMaxMC} MC</p>
        <div className="progress-bar-border" style={{ width: '550px', height: '40px', padding: '5px' }}>
          <div
            className="progress-bar"
            style={{ width: `${coreProgress}%`, backgroundColor: coreProgress === 100 ? '#37E236' : 'white', height: '28px'}}
          ></div>
        </div>
      </div>
      <div>
        <p>General Elective: {genEleTotalMC} / {genEleMaxMC} MC</p>
        <div className="progress-bar-border" style={{ width: '550px', height: '40px', padding: '5px'}}>
          <div
            className="progress-bar"
            style={{ width: `${genEleProgress}%`, backgroundColor: genEleProgress === 100 ? '#37E236' : 'white' , height: '28px' }}
          ></div>
        </div>
      </div>
      <div>
        <p>Unrestricted Elective: {unrestEleTotalMC} / {unrestEleMaxMC} MC</p>
        <div className="progress-bar-border" style={{ width: '550px', height: '40px', padding: '5px' }}>
          <div
            className="progress-bar"
            style={{ width: `${unrestEleProgress}%`, backgroundColor: unrestEleProgress === 100 ? '#37E236' : 'white', height: '28px' }}
          ></div>
        </div>
      </div>
      <div>
        <p>Breadth & Depth Elective: {breadthDepthTotalMC} / {breadthDepthMaxMC} MC</p>
        <div className="progress-bar-border" style={{ width: '550px', height: '40px', padding: '5px' }}>
          <div
            className="progress-bar"
            style={{ width: `${breadthDepthProgress}%`, backgroundColor: breadthDepthProgress === 100 ? '#37E236' : 'white', height: '28px' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ModuleProgress;
