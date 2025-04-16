import { useMemo } from 'react';
import useCurrentLang from '../../hooks/useCurrentLang';

const useHeaderConfig = () => {
  const currentLang = useCurrentLang();

  const links = useMemo(() => {
    return [
      { id: '1', type: 'link', name: '_about', to: `/${currentLang}/about` },
      { id: '2', type: 'link', name: '_projects', to: `/${currentLang}/projects` },
      { id: '3', type: 'link', name: '_contact', to: `/${currentLang}/contact` },
      { id: '4', type: 'settings', name: '_settings', to: null },
    ];
  }, [currentLang]);

  return { links };
};

export default useHeaderConfig;
