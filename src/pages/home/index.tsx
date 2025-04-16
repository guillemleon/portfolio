import React from 'react';
import './index.scss';
import Layout from '../../components/layout';
import { useTranslation } from 'react-i18next';

function Home() {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="home-container">
        <h1 className="home-title">{t('HOME_TITLE')}</h1>
        <h2 className="home-subtitle">{t('HOME_SUBTITLE')}</h2>
      </div>
    </Layout>
  );
}

export default Home;
