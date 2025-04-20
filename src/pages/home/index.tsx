import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'dompurify';
import './index.scss';
import Layout from '../../components/layout';

const GRID_SIZE = 20;

function Home() {
  const { t } = useTranslation();
  const cells = Array.from({ length: GRID_SIZE * GRID_SIZE });

  const safeHTMLSubtitle = useMemo(() => {
    return DOMPurify.sanitize(t('HOME_SUBTITLE'));
  }, [t]);

  return (
    <Layout>
      <div className="home-container">
        <h1 className="home-title">{t('HOME_TITLE')}</h1>
        <h2 className="home-subtitle" dangerouslySetInnerHTML={{ __html: safeHTMLSubtitle }}></h2>
      </div>
    </Layout>
  );
}

export default Home;
