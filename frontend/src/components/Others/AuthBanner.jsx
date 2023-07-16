import React from 'react'
import banner1 from '../../assets/banner1.mp4';

const AuthBanner = ({ bannerPath}) => {
  return (
    <div 
      style={{
        overflow: 'hidden', 
        height: '100vh', 
        width: '45%',
        minWidth: '625px'
      }}>
      <video
        style={{ width: '100%', objectFit: 'cover', bottom: 0, transform: 'translateY(-5%)' }}
        src={bannerPath}
        autoPlay
        loop
        muted
      />
    </div>
  );
};

export default AuthBanner