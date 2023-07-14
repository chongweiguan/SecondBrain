import React from 'react'
import Banner from '../components/Others/Banner'
import banner2 from '../assets/banner2.mp4';

const FinancePage = () => {
  return (
    <div className="black-background">
      <Banner bannerPath={banner2} logo={'💵'} />
      <h1 className="page-header">
          &#123; Expenses & Finances &#125;
        </h1>
        <h1 className="page-subHeader">
          💰 &nbsp;&nbsp;Money, Money, Money
        </h1>
    </div>
  )
}

export default FinancePage