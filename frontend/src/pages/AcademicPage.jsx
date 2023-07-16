import React from 'react'
import Banner from '../components/Others/Banner'
import banner3 from '../assets/banner3.mp4';
import AssignmentBox from '../components/AcademicPage/AssignmentBox';
import ExamBox from '../components/AcademicPage/ExamBox';
import ModuleBox from '../components/AcademicPage/ModuleBox';
import ModuleProgress from '../components/AcademicPage/ModuleProgress';

const AcademicPage = () => {
  return (
    <div className="black-background">
      <Banner bannerPath={banner3} logo={'📔'} />
      <h1 className="page-header">
          &#123; Education & Academics &#125;
        </h1>
        <h1 className="page-subHeader">
          📖 &nbsp;&nbsp;Just keep going!
        </h1>
        <hr className="line-break" />
        <div style={{ textAlign: 'center' }}>
          <p style={{
              fontSize: '40px',
              fontWeight: '700',
              padding: '5px'
            }}>
              AY2023/2024, Semester 1, Week 2
          </p>
          <p style={{
              fontSize: '22px',
            }}>
              Modules: CS2102 CS2105
          </p>
        </div>
        <div style={{padding: '50px 10px 60px 10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px'}}>
          <AssignmentBox />
          <ExamBox />
        </div>
        <div style={{padding: '0px 10px 80px 10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px'}}>
          <ModuleBox />
          <ModuleProgress />
        </div>
    </div>
  )
}

export default AcademicPage