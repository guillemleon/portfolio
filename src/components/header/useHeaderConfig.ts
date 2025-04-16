import { useMemo } from 'react';

const useHeaderConfig = () => {
  const links = useMemo(() => {
    return [
      { id: '1', type: 'link', name: '_about', to: '/about' },
      { id: '2', type: 'link', name: '_projects', to: '/projects' },
      { id: '3', type: 'link', name: '_contact', to: '/contact' },
      { id: '4', type: 'settings', name: '_settings', to: null },
    ];
  }, []);

  return { links };
};

export default useHeaderConfig;
