import React from 'react'
import Banner from '../components/Others/Banner'
import banner3 from '../assets/banner3.mp4'

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
    </div>
  )
}

export default JobPage