import React from 'react';
import Layout from '../../components/layout';
import { useTranslation } from 'react-i18next';
import './index.scss';

function NotFound() {
  const { t } = useTranslation();

  return (
    <Layout isBannerVisible={true}>
      <div className="page-not-found-container">
        <h1>404</h1>
        <p>{t('PAGE_NOT_FOUND')}</p>
      </div>
    </Layout>
  );
}

export default NotFound;
