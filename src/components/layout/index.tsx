import React from 'react';
import './index.scss';
import Header from '../header';
import useDeviceDetection from '../../hooks/useDeviceDetection';
import HeaderMobile from '../header/mobile';
import Banner from '../banner/index';

interface LayoutProps {
  isBannerVisible?: boolean;
  children: React.ReactNode;
}

const Layout = ({ isBannerVisible = false, children }: LayoutProps) => {
  const isMobile = useDeviceDetection();

  return (
    <div className="layout-container">
      {isBannerVisible && <Banner />}
      {isMobile ? <HeaderMobile /> : <Header />}
      {children}
    </div>
  );
};

export default Layout;
