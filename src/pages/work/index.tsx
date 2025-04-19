import React from 'react';
import Layout from '../../components/layout';
import { useTranslation } from 'react-i18next';
import wip from '../../assets/img/wip.png';
import './index.scss';

function Work() {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="work-container">
        <img src={wip}></img>
        <h1>{t('WIP_TITLE')}</h1>
      </div>
    </Layout>
  );
}

export default Work;
