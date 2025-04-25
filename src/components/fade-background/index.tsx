import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './index.scss';
import { useTheme } from '../../context/ThemeContext';

interface FadeBackgroundProps {
  image: string;
}

const FadeBackground: React.FC<FadeBackgroundProps> = ({ image }) => {
  const [visible, setVisible] = useState(false);
  const [nextImage, setNextImage] = useState(image);

  const { theme } = useTheme();

  const getColor = useCallback(
    (opacity: string = '1') => {
      return theme === 'dark' ? `rgb(11, 11, 11, ${opacity})` : `rgb(224,224,224, ${opacity})`;
    },
    [theme]
  );

  const imageStyle = useMemo(() => {
    if (image) {
      return {
        backgroundImage: `
          linear-gradient(to top, ${getColor()} 10%, transparent 40%),
          linear-gradient(to bottom, ${getColor()} -10%, transparent 40%),
          linear-gradient(to right, ${getColor()} 5%, transparent 50%),
          linear-gradient(transparent 0px, transparent 40%, ${getColor('0.25')} 75%, ${getColor('0.75')} 85%, ${getColor()} 100%),
          url(${nextImage})
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'right',
        backgroundRepeat: 'no-repeat',
      };
    }
  }, [nextImage, getColor]);

  useEffect(() => {
    setVisible(false);
    const timeout = setTimeout(() => {
      setNextImage(image);
      setVisible(true);
    }, 200);

    return () => clearTimeout(timeout);
  }, [image]);

  return (
    <div className={`fade-background ${visible ? 'fade-in' : 'fade-out'}`} style={imageStyle} />
  );
};

export default FadeBackground;
