import React from 'react'
import banner1 from '../../assets/banner1.mp4';

const Banner = ({ bannerPath, logo }) => {
  return (
    <div style={{ position: 'relative', paddingTop: '25.25%'}}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <video
          style={{ width: '100%', objectFit: 'cover' }}
          src={bannerPath}
          autoPlay
          loop
          muted
        />
      </div>
      <div style={{ position: 'absolute', top: '100%', left: '5%', transform: 'translate(-5%, -50%)' }}>
        <p style={{ fontSize: '6vw' }}>{logo}</p>
      </div>
    </div>
  );
};

export default Banner