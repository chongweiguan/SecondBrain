import React from 'react'
import Banner from '../components/Others/Banner'
import banner3 from '../assets/banner3.mp4'
import LeetCodeBox from '../components/JobPage/LeetCodeBox'
import JobBox from '../components/JobPage/JobBox'

const JobPage = () => {
  return (
    <div className="black-background">
      <Banner bannerPath={banner3} logo={'🚀'} />
      <h1 className="page-header">
          &#123; Jobs & Internships &#125;
        </h1>
        <h1 className="page-subHeader">
          🔥 &nbsp;&nbsp;Its the Grind !
        </h1>
        <hr className="line-break" />
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center' , gap: '50px'}}>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0px 0px 30px 0px'}}>
          <LeetCodeBox />
          </div>
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '300px', width: '500px'}}>
            <p style={{fontSize: '30px', fontStyle: 'italic'}}>"He who climbs the ladder must</p>
            <p style={{fontSize: '30px', fontStyle: 'italic'}}>begin at the bottom"</p>
          </div>
        </div>
        <div>
          <div style={{padding: '0px 105px 50px 105px'}}>
            <JobBox />
          </div>
        </div>
    </div>
  )
}

export default JobPage