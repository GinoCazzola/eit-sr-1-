import React from 'react';
import '../scss/layout/_banner.scss';

const Banner = () => {
  return (
    <div className="banner">
      <img src="/assets/Icons/banerpeluches.png" alt="Banner" className="banner-image" />
      <div className="banner-container">
        <h1 className="banner-title">Nuestro catálogo!</h1>
      </div>
    </div>
  );
};

export default Banner;
