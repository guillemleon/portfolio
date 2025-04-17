import React from 'react';
import Layout from '../../components/layout';
import './index.scss';
import Terminal from './terminal';
import { useTranslation } from 'react-i18next';

function About() {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="about-container">
        <Terminal title={t('ABOUT_TITLE')} />
      </div>
    </Layout>
  );
}

export default About;
