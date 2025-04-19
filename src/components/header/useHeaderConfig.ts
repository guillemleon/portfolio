import { useMemo } from 'react';
import useCurrentLang from '../../hooks/useCurrentLang';
import { useTranslation } from 'react-i18next';

export interface LinkInterface {
  id: string;
  type: string;
  name: string;
  to: string | null;
}

const useHeaderConfig = () => {
  const { t } = useTranslation();
  const currentLang = useCurrentLang();

  const links = useMemo((): LinkInterface[] => {
    return [
      { id: '1', type: 'link', name: '_Home', to: `/${currentLang}` },
      { id: '2', type: 'link', name: t('HEADER_ABOUT'), to: `/${currentLang}/about` },
      { id: '3', type: 'link', name: t('HEADER_PROJECTS'), to: `/${currentLang}/projects` },
      { id: '4', type: 'link', name: t('HEADER_CONTACT'), to: `/${currentLang}/contact` },
      { id: '5', type: 'settings', name: t('HEADER_SETTINGS'), to: null },
    ];
  }, [currentLang, t]);

  return { links };
};

export default useHeaderConfig;
