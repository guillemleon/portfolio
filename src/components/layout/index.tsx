import React from 'react';
import './index.scss';
import Header from '../header';
import useDeviceDetection from '../../hooks/useDeviceDetection';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useDeviceDetection();

  return (
    <div className="layout-container">
      {isMobile ? <div></div> : <Header />}
      {children}
    </div>
  );
};

export default Layout;
