import React from 'react';
import './index.scss';
import filminLogo from '../../assets/logos/filmin.png';
import caixabankLogo from '../../assets/logos/caixabank.png';
import keolisLogo from '../../assets/logos/keolis.png';
import extiaLogo from '../../assets/logos/extia.png';
import flykubeLogo from '../../assets/logos/flykube.png';

const bannerImages = [
  filminLogo,
  caixabankLogo,
  keolisLogo,
  extiaLogo,
  flykubeLogo,
  filminLogo,
  caixabankLogo,
  keolisLogo,
  extiaLogo,
  flykubeLogo,
  filminLogo,
  caixabankLogo,
  keolisLogo,
  extiaLogo,
  flykubeLogo,
];

function Banner() {
  return (
    <div className="banner-container">
      <div className="banner-items-wrapper">
        {bannerImages.map((imageSrc, index) => (
          <div key={index} className="banner-item">
            <img src={imageSrc} alt={`banner-item-${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Banner;
