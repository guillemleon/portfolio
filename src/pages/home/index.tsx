import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'dompurify';
import './index.scss';
import Layout from '../../components/layout';
import iconWhite from '../../assets/icons/icon_white.png';
import iconBlack from '../../assets/icons/icon_black.png';
import { useTheme } from '../../context/ThemeContext';

function Home() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const safeHTMLSubtitle = useMemo(() => {
    return DOMPurify.sanitize(t('HOME_SUBTITLE'));
  }, [t]);

  const logo = useMemo(() => {
    return theme === 'dark' ? iconWhite : iconBlack;
  }, [theme]);

  return (
    <Layout isBannerVisible={true}>
      <div className="home-container">
        <div className="home-title-container">
          <img src={logo} />
          <h1 className="home-title">{t('HOME_TITLE')}</h1>
        </div>
        <h2 className="home-subtitle" dangerouslySetInnerHTML={{ __html: safeHTMLSubtitle }}></h2>
      </div>
    </Layout>
  );
}

export default Home;
