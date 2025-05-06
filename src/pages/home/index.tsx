import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'dompurify';
import './index.scss';
import Layout from '../../components/layout';
import iconWhite from '../../assets/img/logo-512-white.png';
import iconBlack from '../../assets/img/logo-512-black.png';
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
    <Layout>
      <div className="home-container">
        {/* <h1 className="home-title">{t('HOME_TITLE')}</h1> */}
        <img className="logo" src={logo} />
        <div className="logo-spinner-inner" />
        <div className="logo-spinner-outer" />
        <div className="logo-spinner-outer-outer" />
        {/* <h2 className="home-subtitle" dangerouslySetInnerHTML={{ __html: safeHTMLSubtitle }}></h2> */}
      </div>
    </Layout>
  );
}

export default Home;
