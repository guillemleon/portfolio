import { useMemo } from 'react';
import useCurrentLang from '../../hooks/useCurrentLang';
import { useTranslation } from 'react-i18next';

const useHeaderConfig = () => {
  const { t } = useTranslation();
  const currentLang = useCurrentLang();

  const links = useMemo(() => {
    return [
      { id: '1', type: 'link', name: t('HEADER_ABOUT'), to: `/${currentLang}/about` },
      { id: '2', type: 'link', name: t('HEADER_PROJECTS'), to: `/${currentLang}/projects` },
      { id: '3', type: 'link', name: t('HEADER_CONTACT'), to: `/${currentLang}/contact` },
      { id: '4', type: 'settings', name: t('HEADER_SETTINGS'), to: null },
    ];
  }, [currentLang, t]);

  return { links };
};

export default useHeaderConfig;
