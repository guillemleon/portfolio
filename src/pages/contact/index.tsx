import React from 'react';
import Layout from '../../components/layout';
import './index.scss';
import { useTranslation } from 'react-i18next';

function Contact() {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="contact-container">
        <h1 className="contact-title">{t('CONTACT_TITLE')}</h1>
        <p className="contact-subtitle">{t('CONTACT_SUBTITLE')}</p>
        <span className="contact-separator">--</span>
        <p className="contact-email">
          <span>{t('COMMAND_LINE')}</span> {t('CONTACT_EMAIL')}
        </p>
      </div>
    </Layout>
  );
}

export default Contact;
