import React from 'react';
import './index.scss';
import Header from '../header';
import useDeviceDetection from '../../hooks/useDeviceDetection';
import HeaderMobile from '../header/mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useDeviceDetection();

  return (
    <div className="layout-container">
      {isMobile ? <HeaderMobile /> : <Header />}
      {children}
    </div>
  );
};

export default Layout;
