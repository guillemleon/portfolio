import { useState, useEffect } from 'react';

const useDeviceDetection = (): boolean => {
  const [isMobile, setIsMobile] = useState<any>(null);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 1200);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return isMobile;
};

export default useDeviceDetection;
